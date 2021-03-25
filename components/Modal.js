import React, { Children } from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal({isVisible, setVisible,chidren}) {

    return (
       <Overlay
       isVisible={isVisible}
       overlayStyle={styles.overlay}
       onBackdropPress={()=>setVisible(false)}
       >
        {
            chidren
        }
       </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        width:"90%"
         
    }
})
