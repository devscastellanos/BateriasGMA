export function getCloudinaryUrl(transformations: string, publicId: string){
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformations}/${publicId}`;
}

export const getCloudinaryCardUrl = (publicId: string) => getCloudinaryUrl("w_400,h_300,c_fill,f_auto,q_auto", publicId);

export const getCloudinaryDetailUrl = (publicId: string) => getCloudinaryUrl("w_800,h_600,c_fill,f_auto,q_auto", publicId);

export const getCloudinaryMinUrl = (publicId: string) => getCloudinaryUrl("w_80,h_80,c_thumb,f_auto,q_auto", publicId);

export const getCloudinaryLogoUrl = (publicId: string) => getCloudinaryUrl("w_200,h_80,c_pad,f_auto,q_auto", publicId);

// Foto completa de la ficha de producto. Usa `c_fit` y no `c_fill` a proposito:
// las fotos de este catalogo no comparten proporcion (hay cuadradas de 600, de
// 1080 y de 1000, y dos verticales de 1800x2400) y `c_fill` rellena el marco
// recortando lo que sobra: entre 12% y 44% de la bateria, segun el caso.
// `c_fit` encaja la imagen entera dentro de 800x600 sin cortar nada. Sin `b_`
// de fondo para que no aparezca un recuadro blanco contra el fondo calido del
// sitio.
//
// `e_trim` va antes y quita el margen vacio (transparente o de color liso) que
// traen los archivos alrededor de la bateria. Sin el, las de MAC se veian
// diminutas: son PNG de 1080x1080 donde la bateria ocupa unos 600x600, y el
// resto es margen. En las de Duncan el margen es menor (~15%). El aire alrededor
// lo pone cada pantalla con CSS, para que sea igual en todas las fotos.
export const getCloudinaryProductoUrl = (publicId: string) => getCloudinaryUrl("e_trim/w_800,h_600,c_fit,f_auto,q_auto", publicId);
