import { ModalProps as AntdModalProps } from 'antd';

export interface ModalProps extends AntdModalProps {
  children: JSX.Element;
}
