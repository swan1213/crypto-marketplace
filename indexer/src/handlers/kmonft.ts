import { BigInt, log } from "@graphprotocol/graph-ts"

import { cancelActiveBreedingOrder, cancelActiveOrder, clearNFTBreedingOrderProperties, clearNFTOrderProperties, clearNFTProperties, getNFTId, updateNFTBreedingOrderProperties, updateNFTOrderProperties } from "../modules/nft"
import * as categories from '../modules/category/categories'
import * as addresses from '../data/addresses'
import { Birth, EggHatched, Transfer } from "../entities/KMONFT/KMONFT"
import { BreedingCentre, BreedingOrder, Kryptomon, KryptomonExtraData, KryptomonGenes, NFT } from "../entities/schema"
import { createAccount } from "../modules/wallet"
import { buildKryptomonFromNFT, ElementData, getKryptomonTokenURI, typeFormatted } from "../modules/kryptomon"
import { buildCountFromNFT } from "../modules/count"
import { AddToBreedingCentre, BreedKryptomon, EvolveKryptomon, KmonftV1Migration, RemoveFromBreedingCentre, SetBreedingFee } from "../entities/KMONFTV2/KMONFTV2"
import { addOrderToBreedingCentre, removeOrderToBreedingCentre, setBreedingCentreFee } from "../modules/breedingCentre"
import * as status from '../modules/order/status'

export function handleBirth(event: Birth): void {
  let kryptomonId = event.params.kryptomonId.toString()

  let id = getNFTId(categories.KRYPTOMON, event.address.toHexString(), kryptomonId)

  let kryptomon = new Kryptomon(id)

  kryptomon.tokenId = event.params.kryptomonId
  kryptomon.owner = event.params.owner.toHex()
  kryptomon.isHatched = false;
  kryptomon.matronId = event.params.matronId;
  kryptomon.sireId = event.params.sireId;
  kryptomon.status = event.params.status;
  kryptomon.timeBorn = event.params.timeBorn;

  // Genes
  let genes = new KryptomonGenes(id)
  let paramsGenes = event.params.genes
  genes.fire = paramsGenes[0]
  genes.fireTalent = paramsGenes[1]
  genes.water = paramsGenes[2]
  genes.waterTalent = paramsGenes[3]
  genes.ice = paramsGenes[4]
  genes.iceTalent = paramsGenes[5]
  genes.ground = paramsGenes[6]
  genes.groundTalent = paramsGenes[7]
  genes.air = paramsGenes[8]
  genes.airTalent = paramsGenes[9]
  genes.electro = paramsGenes[10]
  genes.electroTalent = paramsGenes[11]
  genes.ghost = paramsGenes[12]
  genes.ghostTalent = paramsGenes[13]
  genes.grass = paramsGenes[14]
  genes.grassTalent = paramsGenes[15]
  genes.color = paramsGenes[16]
  genes.generalTalent = paramsGenes[17]
  genes.sex = paramsGenes[18]
  genes.attack = paramsGenes[19]
  genes.defense = paramsGenes[20]
  genes.special = paramsGenes[21]
  genes.xFactor = paramsGenes[22]
  genes.growthTalentFactor = paramsGenes[23]
  genes.constitution = paramsGenes[24]
  genes.healthPoints = paramsGenes[25]
  genes.speed = paramsGenes[26]
  genes.affections = paramsGenes[27]
  genes.crazyness = paramsGenes[28]
  genes.instinct = paramsGenes[29]
  genes.hunger = paramsGenes[30]
  genes.laziness = paramsGenes[31]
  genes.brave = paramsGenes[32]
  genes.smart = paramsGenes[33]
  genes.bodySize = paramsGenes[34]
  genes.ego = paramsGenes[35]
  genes.skinType = paramsGenes[36]
  genes.generation = paramsGenes[37]

  kryptomon.genes = id;

  genes.save();

  // extra data
  let extraData = new KryptomonExtraData(id);
  let paramsExtraData = event.params.extra_data;
  extraData.unfreezable = paramsExtraData[0];

  kryptomon.extraData = id;

  extraData.save()

  // element type
  log.warning('typeDraft', [])
  const typeDraft: BigInt[] = [];
  let elementBreakDown: ElementData[] = [];
  let c = 0;
  for (let i = 0; i < 8; i++) {
    let sum: BigInt = paramsGenes[c].times(paramsGenes[c + 1]);
    c = c + 2;
    log.warning("typeDraft = {}", [sum.toString()]);
    typeDraft.push(sum);
    let data: ElementData;
    data.typeName = typeFormatted[i];
    data.valueName = typeDraft[i];
    elementBreakDown.push(data);
  }

  log.warning('elementBreakDown', [])
  log.warning("typeDraft[0] = {}", [typeDraft[0].toString()])

  log.warning('totalSum', [])
  let totalSum: BigInt;
  for (let i = 0; i < elementBreakDown.length; i++) {
    totalSum = totalSum.plus(elementBreakDown[i].valueName);
  }

  for (let i = 0; i < elementBreakDown.length; i++) {
    elementBreakDown[i].percentage = elementBreakDown[i].valueName.times(BigInt.fromString("10000")).div(totalSum)
  }

  let typeSelected = indexOfMax(typeDraft, null);
  kryptomon.elementType = typeFormatted[typeSelected.toI32()];
  kryptomon.elementTalent = typeDraft[typeSelected.toI32()];
  const percentage = kryptomon.elementTalent.times(BigInt.fromString("10000")).div(totalSum);
  kryptomon.elementPercentage = percentage

  let typeSelectedSecond = indexOfMax(typeDraft, typeSelected);
  kryptomon.elementTypeSecond = typeFormatted[typeSelectedSecond.toI32()];
  kryptomon.elementTalentSecond = typeDraft[typeSelectedSecond.toI32()];
  const percentageSecond = kryptomon.elementTalentSecond.times(BigInt.fromString("10000")).div(totalSum);
  kryptomon.elementPercentageSecond = percentageSecond

  if (genes.attack.times(BigInt.fromString("10")).gt(genes.defense.times(BigInt.fromString("11")))) {
    kryptomon.speciality = "Attack";
  } else if (genes.defense.times(BigInt.fromString("10")).gt(genes.attack.times(BigInt.fromString("11")))) {
    kryptomon.speciality = "Defense";
  } else {
    kryptomon.speciality = "Balance";
  }

  kryptomon.save()
  let nft = new NFT(id)
  nft.name = kryptomonId
  nft.contractAddress = event.address
  nft.tokenId = event.params.kryptomonId
  nft.category = categories.KRYPTOMON
  nft.owner = event.params.owner.toHex()
  nft.kryptomon = kryptomon.id;
  nft.tokenURI = getKryptomonTokenURI(kryptomon);
  nft.searchText = ''
  nft.createdAt = event.block.timestamp
  nft.updatedAt = event.block.timestamp
  nft.searchKryptomonGenesGeneration = genes.generation
  nft.searchKryptomonStatus = kryptomon.status
  nft.searchKryptomonSpeciality = kryptomon.speciality
  nft.searchKryptomonElementPercentage = kryptomon.elementPercentage
  nft.searchKryptomonElementType = kryptomon.elementType
  nft.searchKryptomonElementTalent = kryptomon.elementTalent
  nft.searchKryptomonFire = genes.fire
  nft.searchKryptomonFireTalent = genes.fireTalent
  nft.searchKryptomonWater = genes.water
  nft.searchKryptomonWaterTalent = genes.waterTalent
  nft.searchKryptomonIce = genes.ice
  nft.searchKryptomonIceTalent = genes.iceTalent
  nft.searchKryptomonGround = genes.ground
  nft.searchKryptomonGroundTalent = genes.groundTalent
  nft.searchKryptomonAir = genes.air
  nft.searchKryptomonAirTalent = genes.airTalent
  nft.searchKryptomonElectro = genes.electro
  nft.searchKryptomonElectroTalent = genes.electroTalent
  nft.searchKryptomonGhost = genes.ghost
  nft.searchKryptomonGhostTalent = genes.ghostTalent
  nft.searchKryptomonGrass = genes.grass
  nft.searchKryptomonGrassTalent = genes.grassTalent
  nft.searchKryptomonColor = genes.color
  nft.searchKryptomonSex = genes.sex
  nft.searchKryptomonGeneralTalent = genes.generalTalent
  nft.searchKryptomonAttack = genes.attack
  nft.searchKryptomonDefense = genes.defense
  nft.searchKryptomonSpecial = genes.special
  nft.searchKryptomonXFactor = genes.xFactor
  nft.searchKryptomonGrowthTalentFactor = genes.growthTalentFactor
  nft.searchKryptomonConstitution = genes.constitution
  nft.searchKryptomonHealthPoints = genes.healthPoints
  nft.searchKryptomonSpeed = genes.speed
  nft.searchKryptomonAffections = genes.affections
  nft.searchKryptomonCrazyness = genes.crazyness
  nft.searchKryptomonInstinct = genes.instinct
  nft.searchKryptomonHunger = genes.hunger
  nft.searchKryptomonLaziness = genes.laziness
  nft.searchKryptomonBrave = genes.brave
  nft.searchKryptomonSmart = genes.smart
  nft.searchKryptomonBodySize = genes.bodySize
  nft.searchKryptomonEgo = genes.ego
  nft.searchKryptomonSkinType = genes.skinType
  nft.searchKryptomonUnfreezable = extraData.unfreezable
  nft.searchIsKryptomonV2 = event.address.toHexString() == addresses.KMONFT ? false : true;

  nft.save()

  createAccount(event.params.owner)
}

export function handleHatching(event: EggHatched): void {
  let kryptomonId = event.params.kryptomonId.toString()
  let status: BigInt = BigInt.fromI32(1);
  let id = getNFTId(categories.KRYPTOMON, event.address.toHexString(), kryptomonId)

  let nft = NFT.load(id);
  nft.searchKryptomonStatus = status;
  nft.save();

  let kryptomon = Kryptomon.load(id);
  kryptomon.status = status;
  kryptomon.isHatched = true;
  kryptomon.timeHatched = event.block.timestamp;
  kryptomon.save();
}

export function isMint(event: Transfer): boolean {
  return event.params.from.toHexString() == addresses.Null
}

export function handleTransfer(event: Transfer): void {
  if (event.params.tokenId.toString() == '') {
    return
  }

  let contractAddress = event.address.toHexString()
  let category = categories.KRYPTOMON;
  let id = getNFTId(
    category,
    event.address.toHexString(),
    event.params.tokenId.toString()
  )

  let nft = new NFT(id)

  nft.tokenId = event.params.tokenId
  nft.owner = event.params.to.toHex()
  nft.contractAddress = event.address
  nft.category = category
  nft.updatedAt = event.block.timestamp

  if (isMint(event)) {
    nft.createdAt = event.block.timestamp

    nft.searchText = ''

    let metric = buildCountFromNFT(nft)
    metric.save()
  } else {
    let oldNFT = NFT.load(id)
    if (cancelActiveOrder(oldNFT!, event.block.timestamp)) {
      nft = clearNFTOrderProperties(nft!)
    }
    if (cancelActiveBreedingOrder(oldNFT!, event.block.timestamp)) {
      nft = clearNFTBreedingOrderProperties(nft!)
    }
  }

  if (category == categories.KRYPTOMON) {
    if (isMint(event)) {

    } else {
      let kryptomon: Kryptomon = Kryptomon.load(id)!
      kryptomon.owner = nft.owner
      log.info("Transfer: owner-{}, tokenId-{}, speciality-{}", [kryptomon.owner, kryptomon.tokenId.toString(), kryptomon.speciality])
      kryptomon.save()
    }
  }

  createAccount(event.params.to)

  nft.save()
}

export function handleEvoleKryptomon(event: EvolveKryptomon): void {
  let kryptomonId = event.params._tokenId.toString()
  let status = event.params.status;

  if (status.le(BigInt.fromString("1"))) {
    return; // already handling in hatching
  }

  let id = getNFTId(categories.KRYPTOMON, event.address.toHexString(), kryptomonId)

  let nft = NFT.load(id);
  nft.searchKryptomonStatus = status;
  if (status.ge(BigInt.fromString("2"))) {
    nft.searchTimeCanBreed = event.block.timestamp
  }
  nft.save();

  let kryptomon = Kryptomon.load(id);
  kryptomon.status = status;
  kryptomon.maxBreedingsDuringLifePhase = event.params.maxBreedingsDuringLifePhase;
  kryptomon.breedingsLeft = event.params.maxBreedingsDuringLifePhase;
  kryptomon.timeCanBreed = event.block.timestamp;
  kryptomon.save();
}

export function handleKmonftV1Migration(event: KmonftV1Migration): void {
  // migration script
  // remove the old one and add a new one
  let kryptomonIdV1 = event.params._v1TokenId.toString();
  let kryptomonIdV2 = event.params._v2TokenId.toString();

  let idV1 = getNFTId(categories.KRYPTOMON, addresses.KMONFT, kryptomonIdV1)
  let idV2 = getNFTId(categories.KRYPTOMON, event.address.toHexString(), kryptomonIdV2)

  let kryptomonV1 = Kryptomon.load(idV1);

  let kryptomonV2 = new Kryptomon(idV2)
  kryptomonV2.tokenId = event.params._v2TokenId
  kryptomonV2.owner = kryptomonV1.owner
  kryptomonV2.isHatched = kryptomonV1.isHatched;
  kryptomonV2.matronId = kryptomonV1.matronId
  kryptomonV2.sireId = kryptomonV1.sireId;
  kryptomonV2.status = kryptomonV1.status;
  kryptomonV2.timeBorn = kryptomonV1.timeBorn;
  kryptomonV2.timeHatched = kryptomonV1.timeHatched;
  kryptomonV2.lastEvolved = kryptomonV2.status == BigInt.fromString("0") ? kryptomonV1.timeBorn : kryptomonV1.timeHatched;

  let genes = new KryptomonGenes(idV2)
  let paramsGenes = event.params.genes
  genes.fire = paramsGenes[0]
  genes.fireTalent = paramsGenes[1]
  genes.water = paramsGenes[2]
  genes.waterTalent = paramsGenes[3]
  genes.ice = paramsGenes[4]
  genes.iceTalent = paramsGenes[5]
  genes.ground = paramsGenes[6]
  genes.groundTalent = paramsGenes[7]
  genes.air = paramsGenes[8]
  genes.airTalent = paramsGenes[9]
  genes.electro = paramsGenes[10]
  genes.electroTalent = paramsGenes[11]
  genes.ghost = paramsGenes[12]
  genes.ghostTalent = paramsGenes[13]
  genes.grass = paramsGenes[14]
  genes.grassTalent = paramsGenes[15]
  genes.color = paramsGenes[16]
  genes.generalTalent = paramsGenes[17]
  genes.sex = paramsGenes[18]
  genes.attack = paramsGenes[19]
  genes.defense = paramsGenes[20]
  genes.special = paramsGenes[21]
  genes.xFactor = paramsGenes[22]
  genes.growthTalentFactor = paramsGenes[23]
  genes.constitution = paramsGenes[24]
  genes.healthPoints = paramsGenes[25]
  genes.speed = paramsGenes[26]
  genes.affections = paramsGenes[27]
  genes.crazyness = paramsGenes[28]
  genes.instinct = paramsGenes[29]
  genes.hunger = paramsGenes[30]
  genes.laziness = paramsGenes[31]
  genes.brave = paramsGenes[32]
  genes.smart = paramsGenes[33]
  genes.bodySize = paramsGenes[34]
  genes.ego = paramsGenes[35]
  genes.skinType = paramsGenes[36]
  genes.generation = paramsGenes[37]

  kryptomonV2.genes = idV2;

  genes.save();

  // extra data
  let extraDataV1 = KryptomonExtraData.load(idV1);
  let extraData = new KryptomonExtraData(idV2);
  extraData.unfreezable = extraDataV1.unfreezable;

  kryptomonV2.extraData = idV2;

  extraData.save()

  // element type
  log.warning('typeDraft', [])
  const typeDraft: BigInt[] = [];
  let elementBreakDown: ElementData[] = [];
  let c = 0;
  for (let i = 0; i < 8; i++) {
    let sum: BigInt = paramsGenes[c].times(paramsGenes[c + 1]);
    c = c + 2;
    log.warning("typeDraft = {}", [sum.toString()]);
    typeDraft.push(sum);
    let data: ElementData;
    data.typeName = typeFormatted[i];
    data.valueName = typeDraft[i];
    elementBreakDown.push(data);
  }

  log.warning('elementBreakDown', [])
  log.warning("typeDraft[0] = {}", [typeDraft[0].toString()])

  log.warning('totalSum', [])
  let totalSum: BigInt;
  for (let i = 0; i < elementBreakDown.length; i++) {
    totalSum = totalSum.plus(elementBreakDown[i].valueName);
  }

  for (let i = 0; i < elementBreakDown.length; i++) {
    elementBreakDown[i].percentage = elementBreakDown[i].valueName.times(BigInt.fromString("10000")).div(totalSum)
  }

  let typeSelected = indexOfMax(typeDraft, null);
  kryptomonV2.elementType = typeFormatted[typeSelected.toI32()];
  kryptomonV2.elementTalent = typeDraft[typeSelected.toI32()];
  const percentage = kryptomonV2.elementTalent.times(BigInt.fromString("10000")).div(totalSum);
  kryptomonV2.elementPercentage = percentage

  let typeSelectedSecond = indexOfMax(typeDraft, typeSelected);
  kryptomonV2.elementTypeSecond = typeFormatted[typeSelectedSecond.toI32()];
  kryptomonV2.elementTalentSecond = typeDraft[typeSelectedSecond.toI32()];
  const percentageSecond = kryptomonV2.elementTalentSecond.times(BigInt.fromString("10000")).div(totalSum);
  kryptomonV2.elementPercentageSecond = percentageSecond

  if (genes.attack.times(BigInt.fromString("10")).gt(genes.defense.times(BigInt.fromString("11")))) {
    kryptomonV2.speciality = "Attack";
  } else if (genes.defense.times(BigInt.fromString("10")).gt(genes.attack.times(BigInt.fromString("11")))) {
    kryptomonV2.speciality = "Defense";
  } else {
    kryptomonV2.speciality = "Balance";
  }

  kryptomonV2.save()

  let nft = new NFT(idV2)
  nft.name = kryptomonIdV2
  nft.contractAddress = event.address
  nft.tokenId = event.params._v2TokenId
  nft.category = categories.KRYPTOMON
  nft.owner = kryptomonV2.owner
  nft.kryptomon = kryptomonV2.id;
  nft.tokenURI = getKryptomonTokenURI(kryptomonV2);
  nft.searchText = ''
  nft.createdAt = event.block.timestamp
  nft.updatedAt = event.block.timestamp
  nft.searchKryptomonGenesGeneration = genes.generation
  nft.searchKryptomonStatus = kryptomonV2.status
  nft.searchKryptomonSpeciality = kryptomonV2.speciality
  nft.searchKryptomonElementPercentage = kryptomonV2.elementPercentage
  nft.searchKryptomonElementType = kryptomonV2.elementType
  nft.searchKryptomonElementTalent = kryptomonV2.elementTalent
  nft.searchKryptomonFire = genes.fire
  nft.searchKryptomonFireTalent = genes.fireTalent
  nft.searchKryptomonWater = genes.water
  nft.searchKryptomonWaterTalent = genes.waterTalent
  nft.searchKryptomonIce = genes.ice
  nft.searchKryptomonIceTalent = genes.iceTalent
  nft.searchKryptomonGround = genes.ground
  nft.searchKryptomonGroundTalent = genes.groundTalent
  nft.searchKryptomonAir = genes.air
  nft.searchKryptomonAirTalent = genes.airTalent
  nft.searchKryptomonElectro = genes.electro
  nft.searchKryptomonElectroTalent = genes.electroTalent
  nft.searchKryptomonGhost = genes.ghost
  nft.searchKryptomonGhostTalent = genes.ghostTalent
  nft.searchKryptomonGrass = genes.grass
  nft.searchKryptomonGrassTalent = genes.grassTalent
  nft.searchKryptomonColor = genes.color
  nft.searchKryptomonSex = genes.sex
  nft.searchKryptomonGeneralTalent = genes.generalTalent
  nft.searchKryptomonAttack = genes.attack
  nft.searchKryptomonDefense = genes.defense
  nft.searchKryptomonSpecial = genes.special
  nft.searchKryptomonXFactor = genes.xFactor
  nft.searchKryptomonGrowthTalentFactor = genes.growthTalentFactor
  nft.searchKryptomonConstitution = genes.constitution
  nft.searchKryptomonHealthPoints = genes.healthPoints
  nft.searchKryptomonSpeed = genes.speed
  nft.searchKryptomonAffections = genes.affections
  nft.searchKryptomonCrazyness = genes.crazyness
  nft.searchKryptomonInstinct = genes.instinct
  nft.searchKryptomonHunger = genes.hunger
  nft.searchKryptomonLaziness = genes.laziness
  nft.searchKryptomonBrave = genes.brave
  nft.searchKryptomonSmart = genes.smart
  nft.searchKryptomonBodySize = genes.bodySize
  nft.searchKryptomonEgo = genes.ego
  nft.searchKryptomonSkinType = genes.skinType
  nft.searchKryptomonUnfreezable = extraData.unfreezable
  nft.searchIsKryptomonV2 = true;

  nft.save()

  let nftV1 = NFT.load(idV1);
  nftV1 = clearNFTProperties(nftV1!);
  nftV1.save();

}

export function handleSetBreedingFee(event: SetBreedingFee): void {
  let breedingCentre = setBreedingCentreFee(event.params._price);
  breedingCentre.save();
}
export function handleAddToBreedingCentre(event: AddToBreedingCentre): void {
  let nftId = getNFTId(
    categories.KRYPTOMON,
    event.address.toHexString(),
    event.params._tokenId.toString()
  )
  let nft = NFT.load(nftId)

  let breedingOrder = new BreedingOrder(nftId)
  breedingOrder.price = event.params.price
  breedingOrder.status = status.OPEN
  breedingOrder.tokenId = event.params._tokenId
  breedingOrder.createdAt = event.block.timestamp
  breedingOrder.kryptomon = nftId
  breedingOrder.kryptomonAddress = event.address
  breedingOrder.txHash = event.transaction.hash
  breedingOrder.breeder = nft.owner;
  breedingOrder.blockNumber = event.block.number
  breedingOrder.createdAt = event.block.timestamp
  breedingOrder.updatedAt = event.block.timestamp

  nft = updateNFTBreedingOrderProperties(nft!, breedingOrder!)
  nft.save();

  breedingOrder.save();

  let breedingCentre = addOrderToBreedingCentre();
  breedingCentre.save();
}
export function handleRemoveFromBreedingCentre(event: RemoveFromBreedingCentre): void {
  let nftId = getNFTId(
    categories.KRYPTOMON,
    event.address.toHexString(),
    event.params._tokenId.toString()
  )
  let nft = NFT.load(nftId)

  let breedingOrder = BreedingOrder.load(nftId)
  breedingOrder.price = null
  breedingOrder.status = status.CANCELLED
  breedingOrder.tokenId = event.params._tokenId
  breedingOrder.updatedAt = event.block.timestamp;

  nft = updateNFTBreedingOrderProperties(nft!, breedingOrder!);
  nft.save();

  breedingOrder.save();

  let breedingCentre = removeOrderToBreedingCentre();
  breedingCentre.save();
}
export function handleBreedKryptomon(event: BreedKryptomon): void {
  let nftSireId = getNFTId(
    categories.KRYPTOMON,
    event.address.toHexString(),
    event.params._sireTokenId.toString()
  )

  let nftMatronId = getNFTId(
    categories.KRYPTOMON,
    event.address.toHexString(),
    event.params._matronTokenId.toString()
  )

  let nftSire = NFT.load(nftSireId)
  nftSire.searchTimeCanBreed = event.params._sireCanBreedNext
  nftSire.save();

  let nftMatron = NFT.load(nftMatronId)
  nftMatron.searchTimeCanBreed = event.params._matronCanBreedNext
  nftMatron.save();

  // breeding counts
  const count = BigInt.fromString("1")
  let sireKryptomon = Kryptomon.load(nftSireId);
  sireKryptomon.breedingsLeft = sireKryptomon.breedingsLeft.minus(count);
  sireKryptomon.totalBreedingCount = sireKryptomon.totalBreedingCount.plus(count);
  sireKryptomon.breedingCount = sireKryptomon.breedingCount.plus(count);
  sireKryptomon.timeCanBreed = event.params._sireCanBreedNext;
  sireKryptomon.lastTimeBred = event.block.timestamp;

  sireKryptomon.save();

  let matronKryptomon = Kryptomon.load(nftMatronId);
  matronKryptomon.breedingsLeft = matronKryptomon.breedingsLeft.minus(count);
  matronKryptomon.totalBreedingCount = matronKryptomon.totalBreedingCount.plus(count);
  matronKryptomon.breedingCount = matronKryptomon.breedingCount.plus(count);
  matronKryptomon.timeCanBreed = event.params._matronCanBreedNext;
  matronKryptomon.lastTimeBred = event.block.timestamp;

  matronKryptomon.save();
}

export function indexOfMax(arr: Array<BigInt>, indexToIgnore: BigInt): BigInt {
  if (arr.length === 0) {
    return BigInt.fromString("0");
  }

  var max = arr[0];
  var maxIndex = BigInt.fromString("0");

  for (var i = 1; i < arr.length; i++) {
    if (indexToIgnore != null) {
      if (BigInt.fromString(i.toString()).notEqual(indexToIgnore)) {
        if (arr[i].gt(max)) {
          maxIndex = BigInt.fromString(i.toString());
          max = arr[i];
        }
      }
    }
    else {
      if (arr[i].gt(max)) {
        maxIndex = BigInt.fromString(i.toString());
        max = arr[i];
      }
    }
  }

  return maxIndex;
}

//export function handleTransfer(event: Transfer): void {}
