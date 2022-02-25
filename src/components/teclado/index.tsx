import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Values } from '../..'

import Botao from './botao'

interface Props {
  setValues: React.Dispatch<React.SetStateAction<Values>>,
  setDisplay: React.Dispatch<React.SetStateAction<string>>,
  setOperator: React.Dispatch<React.SetStateAction<Operator>>
}

export type Operator = '/' | '*' | '+' | '-' | '=' | ''

export type Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '.' | ''

export type Deletes = 'AC' | 'X'

export type Value = Deletes | Operator | Digit

export interface CallbackProps {
  digit?: Digit,
  operator?: Operator,
  clear?: 1 | 2
}

export type CallbaclFunction = (props: CallbackProps) => void

interface InitialState {
  operating: boolean,
  current: 0 | 1,
  values: Values,
  operator: Operator,
  displayLocal: string,
  clear: boolean
}

const initialState: InitialState = {
  current: 0,
  operating: false,
  values: [0, 0],
  operator: '',
  displayLocal: '0',
  clear: true
}

const Keyboard
: React.FC<Props>
= ({ 
  setOperator, setValues,
  setDisplay 
}) => {

  const [allState, setAllState] = useState({ ...initialState })

  const _handleCallback
  : CallbaclFunction
  = useCallback(({ clear, digit, operator }) => {
    if (digit) {

      setAllState(oldState => {
        const _ = { ...oldState }
        
        _.operating = false
        _.clear = false

        if (oldState.operating || oldState.clear) {
          _.displayLocal = digit

          const _values: Values = [..._.values]

          _values[_.current] = digit.includes('.') ? parseFloat(digit) : parseInt(digit)

          _.values = _values

          return _
        } else {
          if (!(digit === '.' && _.displayLocal.includes(digit))) {
            _.displayLocal = `${ +_.displayLocal ? _.displayLocal : '' }${ digit }`
          }

          const _values: Values = [..._.values]

          _values[_.current] = _.displayLocal.includes('.') ? parseFloat(_.displayLocal) : parseInt(_.displayLocal)

          _.values = _values

          return _
        }
      })

    }

    if (clear) {

      if (clear === 2) {
        setAllState(oldState => {
          const _ = { ...oldState }
  
          _.operating = false
          _.operator = ''
          _.current = 0
          _.values = [0, 0]
          _.displayLocal = '0'
          _.clear = false
  
          return _
        })
      } else {
        setAllState(oldState => {
          const _ = { ...oldState }

          const _displayLocal = _.displayLocal
            .slice(0, _.displayLocal.length - 1)

          _.displayLocal = _displayLocal.length ? _displayLocal : '0'

          _.values[_.current] = _.displayLocal.includes('.') ? parseFloat(_.displayLocal) : parseInt(_.displayLocal)

          return _
        })

      }

    }

    if (operator) {

      setAllState(oldState => {

        const _ = { ...oldState }

        if (_.current === 1) {
          const equals = operator === '='

          const _values: Values = [ ..._.values ]

          try {
            _values[0] = eval(`${ _values[0] } ${ _.operating ?  equals ? _.operator : operator : _.operator } ${ _values[1] }`)
      
          } catch(e) {
            _values[0] = _.values[0]
            console.error(e)
          } finally {
            _values[1] = 0
            _.displayLocal = `${ _values[0] }`
            _.current = equals ? 0 : 1
            _.values = _values
            _.operating = !equals
            _.clear = true
          }
        } else {
          if (!_.operating) {
            _.current = !!_.current ? 0 : 1
          }
  
          if (!_.operating) {
            _.operating = true
          }

          if (_.clear) {
            _.clear = false
          }

          _.displayLocal = '0'
        }

        _.operator = operator !== '=' ? operator : ''

        return _
      })
    }
  }, [])

  useEffect(() => {
    console.log(allState)
    setDisplay(allState.displayLocal)
    setValues(allState.values)
    setOperator(allState.operator)
  }, [allState])

  return (
    <View style={ styles.container }>
      <Botao value='AC' cb={ _handleCallback } duble />
      <Botao value='X' cb={ _handleCallback } />
      <Botao value='/' cb={ _handleCallback } operator />
      <Botao value='7' cb={ _handleCallback } />
      <Botao value='8' cb={ _handleCallback } />
      <Botao value='9' cb={ _handleCallback } />
      <Botao value='*' cb={ _handleCallback } operator />
      <Botao value='4' cb={ _handleCallback } />
      <Botao value='5' cb={ _handleCallback } />
      <Botao value='6' cb={ _handleCallback } />
      <Botao value='-' cb={ _handleCallback } operator />
      <Botao value='1' cb={ _handleCallback } />
      <Botao value='2' cb={ _handleCallback } />
      <Botao value='3' cb={ _handleCallback } />
      <Botao value='+' cb={ _handleCallback } operator />
      <Botao value='0' cb={ _handleCallback } duble />
      <Botao value='.' cb={ _handleCallback } />
      <Botao value='=' cb={ _handleCallback } operator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
})

export default Keyboard
