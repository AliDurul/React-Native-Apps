import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, dimension }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} >
      <Image source={iconUrl} style={styles.btnImg(dimension)} resizeMode='cover' />
    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn