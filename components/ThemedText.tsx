import { Text, type TextProps } from 'react-native';


export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'light';
} & TextProps;

const variantStyles = {
    default: "font-base " ,
    title: "font-bold text-2xl " ,
    defaultSemiBold: "font-semibold text-lg ",
    subtitle: "font-bold text-xl " ,
    link: "font-base text-emerald-900 dark:text-emerald-100",
    light: "font-base text-s text-light",
}

export function ThemedText({ style, type = 'default', className, ...rest }: ThemedTextProps) {

    return (
        <Text
            className={`${className} ${variantStyles[type]}`}
            {...rest}
        />
    );
}
