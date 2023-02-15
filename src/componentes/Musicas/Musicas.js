import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica,
} from "./styled";

// const musicasLocal = [{
//     artist: "Artista 1",
//     id: "1",
//     name: "Musica1",
//     url: "http://spoti4.future4.com.br/1.mp3"
// },
// {
//     artist: "Artista 2",
//     id: "2",
//     name: "Musica2",
//     url: "http://spoti4.future4.com.br/2.mp3"
// },
// {
//     artist: "Artista 3",
//     id: "3",
//     name: "Musica3",
//     url: "http://spoti4.future4.com.br/3.mp3"
// }]

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);

  const [artista, setArtista] = useState("");
  const [musica, setMusica] = useState("");
  const [url, setUrl] = useState("");

  const Headers = {
    headers: {
      Authorization: "analice-marques-conway",
    },
  };

  const recebeMusicas = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        Headers
      )
      .then((resposta) => {
        setMusicas(resposta.data.result.tracks);
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  const adicionaMusica = () => {
    const newTrack = {
      name: musica,
      artist: artista,
      url: url,
    };

    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        newTrack,
        Headers
      )
      .then(() => {
        recebeMusicas();
        setArtista("");
        setMusica("");
        setUrl("");
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  const removeMusica = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,
        Headers
      )
      .then(() => {
        recebeMusicas();
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  const delPlaylist = async () => {
    try {
      await axios.delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}`,
        Headers
      );
      alert("Playlist removida");
      props.recebePlaylists();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    recebeMusicas();
  }, []);

  return (
    <ContainerMusicas>
      <button onClick={() => delPlaylist()}>X</button>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => removeMusica(musica.id)}>X</button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <InputMusica
          placeholder="artista"
          value={artista}
          onChange={(e) => {
            setArtista(e.target.value);
          }}
        />

        <InputMusica
          placeholder="musica"
          value={musica}
          onChange={(e) => {
            setMusica(e.target.value);
          }}
        />

        <InputMusica
          placeholder="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />

        <Botao onClick={() => adicionaMusica()}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
