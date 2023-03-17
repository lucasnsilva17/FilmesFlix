import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify'

function Filme(){

    const{ id } = useParams();
    const[filme, setFilme] = useState({}); 
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"c84c61f57be638e77eb8642807dd9cc6",
                    language:"pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                toast.error("Erro ao buscar filme selecionado");
                navigate("/", {replace: true});
                return;
            });
        }

        loadFilme();

        return ()=>{
            console.log("componente desmontado")
        }

    }, [navigate, id])

    if(loading){
        return (
            <div className="filme-info">
                <h1>Carregando detalhes</h1>
            </div>
        );
    }

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@filmesFavoritos");
        
        let filmesSalvos= JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => {
            return filmeSalvo.id === filme.id;
        });

        if(hasFilme){
            toast.warn("Este filme já está na sua lista de favoritos");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@filmesFavoritos", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailler</a>
                </button>
            </div>

        </div>
    )
}

export default Filme;