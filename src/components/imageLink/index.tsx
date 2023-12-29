import React from 'react';
import Link from 'next/link';
import { ImageLinkProps } from './type';

const ImageLink: React.FC<ImageLinkProps> = ({ href, ...imgProps }) => {
  return (
    <Link href={href}>
      <img {...imgProps} />
    </Link>
  );
};

export default ImageLink;
