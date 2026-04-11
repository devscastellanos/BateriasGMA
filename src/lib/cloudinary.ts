export function getCloudinaryUrl(transformations: string, publicId: string){
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export const getCloudinaryCardUrl = (publicId: string) => getCloudinaryUrl("w_400,h_300,c_fill,f_auto,q_auto", publicId);

export const getCloudinaryDetailUrl = (publicId: string) => getCloudinaryUrl("w_800,h_600,c_fill,f_auto,q_auto", publicId);

export const getCloudinaryMinUrl = (publicId: string) => getCloudinaryUrl("w_80,h_80,c_thumb,f_auto,q_auto", publicId);

export const getCloudinaryLogoUrl = (publicId: string) => getCloudinaryUrl("w_200,h_80,c_pad,f_auto,q_auto", publicId);
