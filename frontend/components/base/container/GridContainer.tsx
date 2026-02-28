import { twMerge } from "tailwind-merge"
import Container, { ContainerProps, ContainerType } from "./Container"

export type GridContainerProps<T extends ContainerType = "div"> =
    ContainerProps<T>;

const GridContainer = <T extends ContainerType = "div">(
    props: GridContainerProps<T>
) => {

    const defaultClasses = "grid"

    const classes = twMerge(defaultClasses, props.className)
    delete props.className;

    return <Container {...props} className={classes} />
}

export default GridContainer;