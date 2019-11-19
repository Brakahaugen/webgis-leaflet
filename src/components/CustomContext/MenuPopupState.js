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
        <Button variant="contained" {...bindTrigger(popupState)}>
          Open Menu
        </Button>
      {/* <IconButton variant="contained" {...bindTrigger(popupState)}>
        <MoreVertIcon/>
      </IconButton> */}
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>Cake</MenuItem>
        <MenuItem onClick={popupState.close}>Death</MenuItem>
      </Menu>
    </div>
  )
}
 
export default MenuPopupState