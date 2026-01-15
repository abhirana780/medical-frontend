// Meteors component
export const Meteors = ({
    number,
}: {
    number?: number;
}) => {
    const meteors = new Array(number || 20).fill(true);
    return (
        <>
            {meteors.map((_, idx) => (
                <span
                    key={"meteor" + idx}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: Math.floor(Math.random() * (400 - -400) + -400) + 'px',
                        height: '1px',
                        width: '1px',
                        borderRadius: '9999px',
                        background: '#64748b',
                        boxShadow: '0 0 0 1px #ffffff10',
                        transform: 'rotate(215deg)',
                        animation: 'meteor 5s linear infinite',
                        pointerEvents: 'none',
                    }}
                    className="meteor-item"
                >
                    <style>
                        {`
                @keyframes meteor {
                  0% {
                    transform: rotate(215deg) translateX(0);
                    opacity: 1;
                  }
                  70% {
                    opacity: 1;
                  }
                  100% {
                    transform: rotate(215deg) translateX(-500px);
                    opacity: 0;
                  }
                }
                .meteor-item::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 1px;
                    background: linear-gradient(90deg, #64748b, transparent);
                }
                `}
                    </style>
                </span>
            ))}
        </>
    );
};
