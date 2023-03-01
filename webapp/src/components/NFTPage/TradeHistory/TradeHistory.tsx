import React from 'react'
import { Table } from 'semantic-ui-react'
import { t } from '@kmon/dapps/dist/modules/translation/utils'
import { Props } from './TradeHistory.types'
import './TradeHistory.css'

import DateLink from '../../../images/egg/dateLink.svg'
import KMON from '../../../images/egg/kmon.svg'
import Transfer from '../../../images/egg/transfer.svg'
import Sale from '../../../images/egg/sale.svg'
import Minted from '../../../images/egg/minted.svg'

const TradeHistory = (props: Props) => {
  const { nft } = props

  const EVENT_TYPES = {
    SALE: 'sale',
    TRANSFER: 'transfer',
    MINTED: 'minted'
  }

  type EVENT_TYPES_Keys = keyof typeof EVENT_TYPES
  type Values = typeof EVENT_TYPES[EVENT_TYPES_Keys]

  const getIconByEventType = (type: Values) => {
    switch (type) {
      case EVENT_TYPES.SALE:
        return Sale
      case EVENT_TYPES.TRANSFER:
        return Transfer
      case EVENT_TYPES.MINTED:
        return Minted
      default:
        return Sale
    }
  }

  const events = [
    {
      type: EVENT_TYPES.SALE,
      price: 1200,
      from: {
        name: 'Mauricedevries1981',
        icon: <div className="orange-icon" />
      },
      to: {
        name: 'Umberto2000',
        icon: <div className="blue-icon" />
      },
      date: '1 day ago'
    },
    {
      type: EVENT_TYPES.TRANSFER,
      from: {
        name: 'Mauricedevries1981',
        icon: <div className="orange-icon" />
      },
      to: {
        name: 'Umberto2000',
        icon: <div className="blue-icon" />
      },
      date: '1 day ago'
    },
    {
      type: EVENT_TYPES.MINTED,
      from: {
        name: 'NullAddress',
        icon: <div className="white-icon" />
      },
      to: {
        name: 'RodgerWings',
        icon: <div className="green-icon" />
      },
      date: '1 day ago'
    }
  ]
  return (
    <div className="history-container">
      <Table className="history-table" celled padded>
        <Table.Row>
          <Table.HeaderCell className="event-type">
            {t('nft_page.trade_history.event')}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {t('nft_page.trade_history.price')}
          </Table.HeaderCell>
          <Table.HeaderCell>
            {t('nft_page.trade_history.from')}
          </Table.HeaderCell>
          <Table.HeaderCell>{t('nft_page.trade_history.to')}</Table.HeaderCell>
          <Table.HeaderCell>
            {t('nft_page.trade_history.date')}
          </Table.HeaderCell>
        </Table.Row>
        {events.map((event, index) => {
          const eventIcon = getIconByEventType(event.type)
          return (
            <Table.Row key={index}>
              <Table.Cell className="event-type">
                <img className="event-icon" src={eventIcon} alt="event-icon" />
                {t(`nft_page.trade_history.${event.type}`)}
              </Table.Cell>
              <Table.Cell singleLine>
                {event.price && (
                  <img className="kmon-coin" src={KMON} alt="kmon-coin" />
                )}
                {event.price}
              </Table.Cell>
              <Table.Cell>
                {event.from.icon}
                {event.from.name}
              </Table.Cell>
              <Table.Cell>
                {event.to.icon}
                {event.to.name}
              </Table.Cell>
              <Table.Cell>
                {event.date}{' '}
                <img className="date-link" src={DateLink} alt="date-link" />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table>
    </div>
  )
}

export default React.memo(TradeHistory)
