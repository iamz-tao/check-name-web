import { productTypes } from '~/config/constants'

export const getProductTypesValue = () => productTypes.map(pt => pt.value)
