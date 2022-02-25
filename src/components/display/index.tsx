import React from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'

import { Values } from '../..'

interface Props {
  value?: string,
  values: Values,
  operator?: string
}

const Display
: React.FC<Props>
= ({ value = '0', operator = '', values }) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.operator }>{ operator ? `${ values[0] } ` : '' }{ operator }</Text>
      <TextInput 
        style={ styles.label }
        numberOfLines={ 1 }
        value={ value }
        editable={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    height: Dimensions.get('window').height / 7,
  },
  label: {
    color: '#FFF',
    fontSize: 60
  },
  operator: {
    position: 'absolute',
    top: 0,
    right: 20,
    color: '#FFF',
    fontSize: 20
  }
})

export default Display
