import { FiSearch } from 'react-icons/fi'
import './Main.css'
import { useState } from 'react'
import api from '../services/api'

const Main = () => {

    const [ input, setInput ] = useState('')
    const [ cep, setCep ] = useState({})

    const handleSearch = async () => {
        //62327375/json/

        if(input === ''){
            alert("Informe o CEP.")
            return 
        }

        try {
            const response = await api.get(`${input}/json`)
            setCep(response.data)
            setInput('')
        } catch {
            alert('Erro ao buscar.')
            setInput('')
        }
    }

    return (
        <main className="container">
            <h1 className="title">Buscador de CEP</h1>

            <section className="containerInput">
                <input
                    type="text"
                    placeholder="Digite o CEP"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch 
                        size={25}
                        color="#fff"
                    />
                </button>
            </section>

            {Object.keys(cep).length > 0 && (
                <section className="main">
                    <h2>{cep.cep}</h2>
                    <span>{cep.logradouro}</span>
                    <span>{cep.complemento}</span>
                    <span>{cep.bairro}</span>
                    <span>{cep.localidade} - {cep.uf}</span>
                </section>
            )}
            
        </main>
    )
}

export default Main