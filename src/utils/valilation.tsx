import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'nhập đúng định dạng mail')
    .email('Email invalid'),
  password: yup.string().required('Vui lòng nhập password'),
  // .matches(
  //   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //   'Password phải có 8 ký tự, 1 từ in hoa, 1 số và 1 ký tự đặc biệt'
  // ),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập lại password')
    .oneOf([yup.ref('password')], 'Password không khớp'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong hop ly',
    test: function (value) {
      const price_min = value
      const { price_max } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
      return price_min !== '' || price_max !== ''
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Gia khong hop ly',
    test: function (value) {
      const price_max = value
      const { price_min } = this.parent as { price_min: string; price_max: string }
      if (price_min !== '' && price_max !== '') return Number(price_max) >= Number(price_min)
      return price_min !== '' || price_max !== ''
    }
  })
})
export type Schema = yup.InferType<typeof schema>
