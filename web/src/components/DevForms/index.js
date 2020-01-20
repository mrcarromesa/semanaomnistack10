import React, {useState, useEffect} from 'react';

import './style.css';

export default function DevForms({onSubmit}) {
    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitue] = useState('');
    const [longitude, setLongitude] = useState('');


    useEffect(() => {
        console.log('asdf');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {latitude, longitude} = position.coords;
    
            setLatitue(latitude);
            setLongitude(longitude);
            console.log(position);
          },(err) => {
            console.log(err);
          }, {
            timeout: 30000,
          }
        );
      }, []);

      async function handleAddDev(e){
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        }); 

        setGithub_username('');
        setTechs('');
      }

    return (
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required
            value={github_username}
            onChange={e => setGithub_username(e.target.value)}

            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required
            value={techs}
            onChange={e => setTechs(e.target.value)}
            
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" type="number" required 
                value={latitude}
                onChange={e => setLatitue(e.target.value)}
                />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude"  type="number" required 
                value={longitude} 
                onChange={e => setLongitude(e.target.value)}
                /> 
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>
    );
}