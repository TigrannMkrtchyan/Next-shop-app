'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOrder } from '../../../services/order/orderContext';
import { useUserService } from '../../../services/user/UserServiceContext';
import { FailedMessages } from '@/utils/constants';
import { pagesUrls } from '@/utils/constants';

const useCheckoutForm = () => {
  const orderService = useOrder();
  const userService = useUserService();
  const router = useRouter();
  const [paymentSucceeded, setPaymentSucceeded] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [telephone, setTelephone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [postcode, setPostcode] = useState<string>('');
  const [countryError, setCountryError] = useState<string>('');
  const [provinceError, setProvinceError] = useState<string>('');
  const [postcodeError, setPostcodeError] = useState<string>('');
  const [cityError, setCityError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [telephoneError, setTelephoneError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getCardsData = async () => {
    const response = await userService.getCardData();

    if (response.success && response?.data) {
      let amount = 0;

      for (const element of response.data.purchasedProducts) {
        amount += element.product.price * element.count;
      }
      if (amount) {
        return;
      }
    }
    router.push(pagesUrls.HOME);
  };

  useEffect(() => {
    getCardsData();
  }, []);

  const handleSubmit = async () => {
    setAddressError('');
    setTelephoneError('');
    setNameError('');
    setCityError('');
    setCountryError('');
    setProvinceError('');
    setPostcodeError('');
    let error = false;

    if (!country || !country.trim().length) {
      setCountryError(FailedMessages.CountryRequired);
      error = true;
    }
    if (!province || !province.trim().length) {
      setProvinceError(FailedMessages.ProvinceRequired);
      error = true;
    }
    if (!postcode || !postcode.trim().length) {
      setPostcodeError(FailedMessages.PostcodeRequired);
      error = true;
    }

    if (!city || !city.trim().length) {
      setCityError(FailedMessages.CityRequired);
      error = true;
    }

    if (!telephone || !telephone.trim().length) {
      setTelephoneError(FailedMessages.TelephoneRequired);
      error = true;
    }

    if (!address || !address.trim().length) {
      setAddressError(FailedMessages.AddressRequired);
      error = true;
    }

    if (!name || !name.trim().length) {
      setNameError(FailedMessages.NameRequired);
      error = true;
    }

    if (!error) {
      setLoading(true);
      setIsOpen(true);
      setLoading(false);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSuccess = () => {
    setPaymentSucceeded(true);
    setIsOpen(true);
    orderService.order({
      name,
      address,
      city,
      country,
      postcode,
      province,
      telephone,
    });
  };

  return {
    countryError,
    provinceError,
    postcodeError,
    cityError,
    nameError,
    addressError,
    telephoneError,
    loading,
    country,
    province,
    postcode,
    telephone,
    name,
    address,
    city,
    setCountry,
    setPostcode,
    setProvince,
    setTelephone,
    setName,
    setAddress,
    setCity,
    handleSubmit,
    isOpen,
    setIsOpen,
    onClose,
    paymentSucceeded,
    onSuccess,
  };
};

export default useCheckoutForm;
