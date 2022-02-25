import React, { useCallback } from 'react'
import { 
  Dimensions, StyleSheet, Text, 
  TouchableOpacity 
} from 'react-native'
import { CallbaclFunction, Value } from '.'

interface Props {
  value: Value,
  operator?: boolean,
  duble?: boolean,
  triple?: boolean,
  cb: CallbaclFunction
}

const Botao
: React.FC<Props> 
= ({ value, operator, duble, triple, cb }) => {

  const _handleClick = useCallback(() => {
    switch(value) {
      case '/':
      case '*':
      case '+':
      case '-':
      case '=':
        return cb({ operator: value })
      case 'AC':
        return cb({ clear: 2 })
      case 'X':
        return cb({ clear: 1 })
      default:
        cb({ digit: value })
    }
  }, [value])

  return (
    <TouchableOpacity 
      style={ {
        ...styles.container,
        ...(operator ? styles.operator : duble ? styles.duble : triple ? styles.triple : {})
      }}
      onPress={ _handleClick }
    >
      <Text 
        style={ {
          ...styles.label,
          color: operator ? '#FFF' : '#222'
        }}
      >{ value }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 6,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#888'
  },
  operator: {
    color: '#FFF',
    backgroundColor: '#FA8231'
  },
  duble: {
    width: (Dimensions.get('window').width / 4) * 2
  },
  triple: {
    width: (Dimensions.get('window').width / 4) * 3
  },
  label: {
    fontSize: 40,
    color: '#222',
    fontWeight: 'bold'
  }
})

export default Botao
