import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import userApi from "src/apis/user.api";
import Button from "src/components/Button";
import Input from "src/components/Input";
import InputNumber from "src/components/InputNumber";
import { userSchema, Userschema } from "src/utils/rules";
import DateSelect from "../components/DateSelect";
import { setProfileToLS } from 'src/utils/auth'
import { toast } from "react-toastify";
import { AppContext } from "src/contexts/app.context";

type FormData = Pick<
  userSchema,
  "name" | "address" | "avatar" | "date_of_birth" | "password" | "phone"
>;
const profileSchema = Userschema.pick([
  "name",
  "avatar",
  "address",
  "phone",
  "date_of_birth",
  "password",
]);
export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const { data: ProfileData, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getProfile,
  });
  const profile = ProfileData?.data.data;
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
    resolver: yupResolver(profileSchema),
  });

  const updateProfileMutation = useMutation(userApi.updateProfile)
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("phone", profile.phone);
      setValue("address", profile.address);
      setValue("avatar", profile.avatar);
      setValue(
        "date_of_birth",
        profile.date_of_birth
          ? new Date(profile.date_of_birth)
          : new Date(1990, 0, 1)
      );
    }
  }, [profile]);
  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync({..date})
    setProfile(res.data.data)
    setProfileToLS(res.data.data)
    refetch()
    toast.success(res.data.message)
  })
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Email
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{profile?.email}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Tên
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="name"
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Số điện thoại
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <InputNumber
                    classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                    errorMessage={errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Địa chỉ
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="address"
                errorMessage={errors.address?.message}
              />
            </div>
          </div>
          <Controller
          control={control}
          name="date_of_birth"
          render={({field})=>(<DateSelect errorMessage={errors.date_of_birth?.message} value={field.value} onChange={field.onChange}/>)}
          />
          
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              <div className="sm:w-[80%] sm:pl-5">
                <Button
                  className="flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80"
                  type="submit"
                >
                  save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src="https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn"
                alt=""
                className="w-full rounded-full object-cover"
              />
            </div>
            <input className="hidden" type="file" accept=".jpg,.jpeg,.png" />
            <button
              type="button"
              className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
            >
              Chọn ảnh
            </button>
            <div className="mt-3 text-gray-400">
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
