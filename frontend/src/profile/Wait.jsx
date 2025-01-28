const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#08090a'
};

export default function Wait() {
    return (
        <div style={styles}>
            <h1 style={{ color: 'white' }}>Loading...</h1>
        </div>
    );
}