
export const getStatusStyle = (status: string) => {
    const style = {
        backgroundColor: status === 'paid' ? 'rgba(51, 214, 159, 0.05)'
            : status === 'pending' ? 'rgba(255, 143, 0, 0.05)'
                : '	rgb(223, 227, 250, .05)',
        color: status === 'paid' ? '#33D69F'
            : status === 'pending' ? '#FF8F00'
                : '#dfe3fa'
    }
    return style
}
