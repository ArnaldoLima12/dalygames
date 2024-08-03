export function Container({children} : Readonly<{children: React.ReactNode}>)
{
    return (
        <div className="max-w-[1028px] min-h-screen m-auto p-1">
            {children}
        </div>
    )
}