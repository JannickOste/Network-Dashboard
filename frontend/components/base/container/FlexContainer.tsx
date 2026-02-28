import { twMerge } from "tailwind-merge"
import Container, { ContainerProps, ContainerType } from "./Container"


export type FlexContainerProps<T extends ContainerType = "div"> =
    ContainerProps<T>;

const FlexContainer = <T extends ContainerType = "div">(props: FlexContainerProps<T>) => {

    const defaultClasses = "flex"

    const classes = twMerge(defaultClasses, props.className)
    delete props.className;

    return <Container {...props} className={classes} />
}

export default FlexContainer;