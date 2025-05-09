// LoginForm.tsx
import { useEffect, useRef, useState } from 'react';
import { Input } from '../../../shared/forms/input';
import { SendFormButton } from '../../../shared/buttons/sendFormButton';
import { useNavigate } from 'react-router';
import { changePassword, login, sendCode } from '../services/loginServices';
import CustomToast, {
  CustomToastRef,
  ToastSeverity,
} from '../../../shared/toast/customToast';
import { IoMdCloseCircle } from 'react-icons/io';
import { PasswordRecoveryDialog } from './passwordRecoveryDialog';
import { FaCircleCheck } from 'react-icons/fa6';
import LoadingScreen from '../../../shared/loading/loadingScreen';

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegar en React Router

  /**************************** Form ****************************/
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const cleanForm = () => {
    setVisible(false);
    setStep1(true);
    setCodigo('');
    setNewPassword('');
  };

  const [step1, setStep1] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [codigo, setCodigo] = useState<string | number | null | undefined>(
    undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerForm = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { username: '', password: '' };

    if (!formData.username) {
      newErrors.username = 'Ingrese su usuario';
    }
    if (!formData.password) {
      newErrors.password = 'Ingrese su contraseña';
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      try {
        setLoading(true);
        await login(formData);
        navigate('/dashboard');
      } catch (error: any) {
        console.log(error);
        handleAccion('error', <IoMdCloseCircle size={38} />, error.toString());
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangePassword = async () => {
    console.log('length', codigo?.toString().length);
    if (codigo?.toString().length != 6) {
      handleAccion(
        'error',
        <IoMdCloseCircle size={38} />,
        'Ingrese el codigo completo'
      );
      return;
    }

    try {
      await changePassword({
        email: 'karen.burgos@grupoincoe.com',
        code: codigo,
        new_password: newPassword,
      });
      cleanForm();
      handleAccion(
        'success',
        <FaCircleCheck size={38} />,
        'Contraseña cambiada con exito'
      );
    } catch (error) {
      console.log(error);
      cleanForm();
      handleAccion(
        'error',
        <IoMdCloseCircle size={38} />,
        'Error al modific contraseña'
      );
    }
  };

  /**************************** Toast ****************************/
  const toastRef = useRef<CustomToastRef>(null);

  const handleAccion = (
    severity: ToastSeverity,
    icon: any,
    summary: string
  ) => {
    toastRef.current?.show({
      severity: severity,
      summary: summary,
      icon: icon,
      life: 2000,
    });
  };

  /**************************** Password Recovery ****************************/
  const handleSendCodePassword = async () => {
    setVisible(true);
    try {
      await sendCode({ email: 'karen.burgos@grupoincoe.com' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(codigo);
  }, [codigo]);

  return (
    <>
      {loading && <LoadingScreen />}
      <form className="flex w-full flex-col gap-10">
        <span className="flex flex-col gap-5">
          <span className="flex flex-col items-start">
            <label htmlFor="username">Usuario</label>
            <Input
              name="username"
              placeholder="usuario"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username}</span>
            )}
          </span>

          <span className="flex flex-col items-start">
            <label htmlFor="password">Contraseña</label>
            <Input
              name="password"
              placeholder="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </span>
          <p
            className="text-blue text-end underline hover:cursor-pointer hover:brightness-90"
            onClick={handleSendCodePassword}
          >
            ¿Olvidaste tu contraseña?
          </p>
        </span>
        <SendFormButton
          className="bg-primary-blue text-white"
          text="Ingresar"
          onClick={handlerForm}
        />
        <CustomToast ref={toastRef} />
      </form>

      {/* Password Recovery Dialog */}
      <PasswordRecoveryDialog
        visible={visible}
        step1={step1}
        codigo={codigo}
        newPassword={newPassword}
        onChangeCodigo={setCodigo}
        onChangeNewPassword={setNewPassword}
        onConfirm={handleChangePassword}
        onCancel={cleanForm}
        onNextStep={() => setStep1(false)}
      />
    </>
  );
};
