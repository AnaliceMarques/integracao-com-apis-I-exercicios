import axios from "axios";
import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";

// const playlistsLocal = [
//     {
//         id: 1,
//         name: "Playlist 1"
//     },
//     {
//         id: 2,
//         name: "Playlist 2"
//     },
//     {
//         id: 3,
//         name: "Playlist 3"
//     },
//     {
//         id: 4,
//         name: "Playlist 4"
//     },
// ]
function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [inputPesquisaPlaylist, setInputPesquisaPlaylist] = useState("");
  const [inputNovaPlaylist, setInputNovaPlaylist] = useState("");

  const Headers = {
    headers: {
      Authorization: "analice-marques-conway",
    },
  };

  const recebePlaylists = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`,
        Headers
      )
      .then((resposta) => {
        setPlaylists(resposta.data.result.list);
      })
      .catch((erro) => {
        console.log(erro.response);
      });
  };

  const getPlaylist = async () => {
    try {
      const pesquisa = await axios.get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${inputPesquisaPlaylist}`,
        Headers
      );
      setPlaylists(pesquisa.data.result.playlist);
      setInputPesquisaPlaylist("");
    } catch (error) {
      console.log(error.response);
    }
  };

  const newPlaylist = async () => {
    try {
      const novaPlaylist = {
        name: inputNovaPlaylist,
      };

      await axios.post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`,
        novaPlaylist,
        Headers
      );
      recebePlaylists();
      setInputNovaPlaylist("");
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    recebePlaylists();
  }, []);

  return (
    <div>
      <label htmlFor="pesquisa">
        {" "}
        Pesquisar Playlist{" "}
        <input
          name="pesquisa"
          id="pesquisa"
          placeholder="Nome da Playlist"
          value={inputPesquisaPlaylist}
          onChange={(e) => {
            setInputPesquisaPlaylist(e.target.value);
          }}
        />
        <button onClick={() => getPlaylist()}>Pesquisar</button>
      </label>
      <button onClick={() => recebePlaylists()}>Ver todas</button>
      <label htmlFor="novaPlaylist">
        {" "}
        Criar Playlist{" "}
        <input
          name="novaPlaylist"
          id="novaPlaylist"
          placeholder="Nome da Playlist"
          value={inputNovaPlaylist}
          onChange={(e) => {
            setInputNovaPlaylist(e.target.value);
          }}
        />
        <button onClick={() => newPlaylist()}>Criar</button>
      </label>

      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            recebePlaylists={recebePlaylists}
          />
        );
      })}
    </div>
  );
}

export default Playlists;
