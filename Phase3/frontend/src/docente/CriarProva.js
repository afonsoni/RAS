import React from "react";
import NavbarDocente from "../componentes/NavbarDocente";
import { useNavigate } from 'react-router-dom';

function CriarProva() {
    const history = useNavigate();
    const [provaNome, setProvaNome] = React.useState("");
    const [fileContent, setFileContent] = React.useState([]);

    const handleClick = () => {
      history('/docente');
    }

    const continuar = () => {
      // Pass the data to the next page via state or any other desired method
      history('/criarProva2', { state: { provaNome, fileContent } });
    }

    const handleNomeChange = (e) => {
      setProvaNome(e.target.value);
    }

    const handleFileChange = (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
    
      reader.onload = (event) => {
        try {
          // Assuming the file content is in the format "[pg53895,pg53816,pg54162,pg54284]"
          const content = event.target.result;
    
          // Remove square brackets and split by commas to create an array
          const parsedArray = content.replace(/\[|\]/g, '').split(',');
    
    
          // You can set the parsed array to the state if needed
          setFileContent(parsedArray);
        } catch (error) {
          console.error('Error parsing file content:', error);
        }
      };
    
      // Pass the file to the FileReader
      reader.readAsText(file);
    }
    return (
        <><NavbarDocente />
        <div className="hero min-h-screen bg-base-200">
            <div className="card shadow-xl w-1290 text-neutral-content rounded-lg bg-base-100 " style={{width: '70%'}}>
                <div className="card-body">
                <form> 
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                        <h1 className="text-base font-semibold leading-10 text-gray-900" style={{ fontSize: '2rem' }}>
                          Criar Prova
                        </h1>
                        <hr></hr>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                            <label htmlFor="provaNome" className="block text-sm font-medium leading-6 text-gray-900">
                                Nome
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="provaNome"
                                    id="provaNome"
                                    autoComplete="provaNome"
                                    value={provaNome}
                                    onChange={handleNomeChange}
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Nome da prova"
                                />
                                </div>
                            </div>
                            </div>

                            <div className="col-span-full">
                            <label htmlFor="alunosList" className="block text-sm font-medium leading-6 text-gray-900">
                                Alunos a inscrever
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                </div>
                                <input
                                  type="file"
                                  onChange={handleFileChange}
                                  className="file-input file-input-sm file-input-bordered file-input-secondary w-full max-w-xs"
                                  style={{ borderRadius: '5px', color: 'gray' }}
                                />
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button className="btn btn-sm btn-outline btn-error" type="button" onClick={handleClick}>
                          Cancelar
                        </button>
                        <button
                          className="btn btn-sm btn-primary" type="button"
                          onClick={continuar}
                          >
                          Continuar
                        </button>
                    </div>
                </form>     
        </div>
      </div>
    </div>
    </>
  );
}
export default CriarProva;   