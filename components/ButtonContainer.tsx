import { ReactNode, useState } from 'react';
import { View } from 'react-native';


export const RowButtonContainer = ({ children }: { children: ReactNode }) => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 24
    }}>
      {children}
    </View>
  )
}

export const ButtonContainer = ({ width = 150, children }: { width?: number, children: ReactNode }) => {
  const [conWidth, setConWidth] = useState(width)
  const padding = (conWidth - width) / 2
  return (
    <View
      style={{ width: "100%", marginVertical: 24 }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setConWidth(width);
      }}>
      <View style={{ paddingHorizontal: padding }}>
        {children}
      </View>
    </View>
  )
}
