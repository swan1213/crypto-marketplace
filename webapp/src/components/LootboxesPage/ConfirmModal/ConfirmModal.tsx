import React, { useState } from 'react'
import { t, T } from '@kmon/dapps/dist/modules/translation/utils'
import { Form, Field, Button, Modal } from '@kmon/ui'

import { Props } from './ConfirmModal.types'
import { fromItemCount, toItemCount } from '../../../lib/number'

const ConfirmModal = (props: Props) => {
  const {
    currentItem,
    currentItemCount,
    isBuyingItem,
    showConfirmModal,
    handleProceed,
    onCloseModal,
  } = props

  
  const [itemCount, setItemCount] = useState(currentItemCount)

  return (
    <Modal size="small" open={showConfirmModal} className="ConfirmNumberOfItemsModal">
      <Modal.Header>{t('lootbox_page.confirm.title')}</Modal.Header>
      <Form onSubmit={() => handleProceed(itemCount)}>
        <Modal.Content>
          <T
            id="lootbox_page.confirm.line_one"
            values={{
              item: <b>{currentItem?.name.replace(/_/g, ' ')}</b>
            }}
          />
          <br />
          <T id="lootbox_page.confirm.line_two" />
          <Field
            label={t('lootbox_page.confirm.field_label')}
            placeholder="1"
            type="number"
            min="1"
            value={itemCount}
            onChange={(_event, props) => {
              const newItemCount = fromItemCount(props.value)
              setItemCount(toItemCount(newItemCount))
            }}
            required
          />
        </Modal.Content>
        <Modal.Actions>
          <div
            className="ui button"
            onClick={() => {
              setItemCount('')
              onCloseModal()
            }}
          >
            {t('global.cancel')}
          </div>
          <Button
            type="submit"
            primary
            disabled={isBuyingItem || Number(itemCount) < 1}
            loading={isBuyingItem}
          >
            {t('global.proceed')}
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default React.memo(ConfirmModal)
