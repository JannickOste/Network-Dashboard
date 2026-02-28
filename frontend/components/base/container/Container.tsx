import { ReactNode, ComponentPropsWithoutRef } from "react"

export type ContainerType = "div" | "section" | "article" | "main"

export type ContainerProps<T extends ContainerType = "div"> = {
    children: ReactNode
    as?: T
} & ComponentPropsWithoutRef<T>

const Container = <T extends ContainerType = "div">({
    children,
    as,
    ...props
}: ContainerProps<T>) => {
    const Component = as || "div"

    return <Component {...props}>{children}</Component>
}
(() => (<Container><></></Container>))
export default Container