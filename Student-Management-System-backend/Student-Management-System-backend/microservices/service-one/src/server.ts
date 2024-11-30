import app  from './api/v1/app'

const port: number = Number(process.env.PORT) || 8001;

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});