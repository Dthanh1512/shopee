import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'nhập đúng định dạng mail')
    .email('Email invalid'),
  password: yup.string().required('Vui lòng nhập password'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại password')
    .oneOf([yup.ref('password')], 'Password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong hop ly',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as {
        price_min: string
        price_max: string
      }
      if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong hop ly',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as {
        price_min: string
        price_max: string
      }
      if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
      return price_min !== '' || price_max !== ''
    }
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: yup.string().oneOf([yup.ref('new_password')], 'Password không khớp')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
