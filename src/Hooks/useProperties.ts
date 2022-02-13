import { PropertiesState } from '@/Store/Properties'
import { useSelector } from 'react-redux'
export default function () {
  const allProperties = useSelector(
    (state: { properties: PropertiesState }) => state.properties.allProperties,
  )
  const currentProperty = useSelector(
    (state: { properties: PropertiesState }) =>
      state.properties.currentProperty,
  )

  return { currentProperty, allProperties }
}
