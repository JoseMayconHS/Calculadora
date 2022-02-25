import React, { useState } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

import Display from './components/display'
import Teclado, { Operator } from './components/teclado'

export type Values = [number, number]

export default () => {
  const [display, setDisplay] = useState('0')
  const [operator, setOperator] = useState<Operator>('')
  const [values, setValues] = useState<Values>([0, 0])


  return (
    <View style={ styles.container }>
      <StatusBar backgroundColor={ '#222' } barStyle='light-content' />
      <Display 
        value={ display } 
        operator={ operator } 
        values={ values }
      />
      <Teclado 
        setValues={ setValues }
        setDisplay={ setDisplay } 
        setOperator={ setOperator }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  }
})
