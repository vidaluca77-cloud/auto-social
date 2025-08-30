from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile, os, json

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'], allow_methods=['*'], allow_headers=['*'])

@app.get('/health')
def health():
    return {'ok': True}

@app.post('/transcribe')
async def transcribe(file: UploadFile = File(...)):
    tmpdir = tempfile.mkdtemp()
    path = os.path.join(tmpdir, file.filename)
    with open(path, 'wb') as f: f.write(await file.read())
    data = {'text': 'Ceci est une transcription mock.'}
    json.dump(data, open(os.path.join(tmpdir,'transcription.json'),'w'))
    return {'project_id': os.path.basename(tmpdir), 'transcription': data}
