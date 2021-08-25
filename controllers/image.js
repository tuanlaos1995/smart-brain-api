import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'b9ebf3e420bd4e5b9ce13654efce8937'
   });

export const handleApiCall = (req,res) =>{
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err=>res.status(400).json('unable to work with API'))
}

export const handleImage = (req,res,db)=>{
    const {id} = req.body;
    db('users').where('id','=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=> res.status(400).json('unable to get entries'));
}