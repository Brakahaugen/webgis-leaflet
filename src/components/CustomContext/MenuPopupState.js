import * as React from 'react'
import IconButton from '@material-ui/core/Button'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { usePopupState, bindTrigger, bindMenu } from 'material-ui-popup-state/hooks';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const MenuPopupState = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      <Menu >
        <MenuItem >Cake</MenuItem>
      </Menu>
    </div>
  )
}
 
export default MenuPopupState