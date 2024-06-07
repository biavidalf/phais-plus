import { Text, View, ViewProps } from 'react-native'

interface MedicineTypeProps extends ViewProps {
  type: 'generic' | 'reference' | 'similar' | 'other'
}

const medicationTypes = {
  generic: ['G', '#B1752E'],
  reference: ['R', '#2C5CA6'],
  similar: ['S', '#2E875C'],
  other: ['O', '#707D89'],
}

export default function MedicineType({
  type,
  ...otherProps
}: MedicineTypeProps) {
  const [label, color] = medicationTypes[type]

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: color,
        borderRadius: 4,
      }}
      {...otherProps}
    >
      <Text style={{ color, fontSize: 16, fontWeight: '500' }}>{label}</Text>
    </View>
  )
}
