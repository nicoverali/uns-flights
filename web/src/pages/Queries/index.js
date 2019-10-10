import './index.scss';
import React from 'react';
import PrimaryButton from '@Components/PrimaryButton';
import DataTable from 'react-data-table-component';

const data = [
    {
      "id": "5d9d6b7ed26984f1f067dfff",
      "title": "Zillatide",
      "year": 1950
    },
    {
      "id": "5d9d6b7e22f888416d7b5d83",
      "title": "Locazone",
      "year": 1957
    },
    {
      "id": "5d9d6b7e84c211e7e449d4a0",
      "title": "Applidec",
      "year": 2010
    },
    {
      "id": "5d9d6b7e57fa884c9ee0d3c1",
      "title": "Plasmosis",
      "year": 1945
    },
    {
      "id": "5d9d6b7e2aa376ede7ce71a3",
      "title": "Manglo",
      "year": 2006
    },
    {
      "id": "5d9d6b7ea3642e6acb0f138f",
      "title": "Xelegyl",
      "year": 1959
    },
    {
      "id": "5d9d6b7e5c57be473b191d13",
      "title": "Marqet",
      "year": 2007
    },
    {
      "id": "5d9d6b7e0943582ccaf3b2aa",
      "title": "Atomica",
      "year": 1938
    },
    {
      "id": "5d9d6b7e7895549d3927d6c7",
      "title": "Silodyne",
      "year": 1949
    },
    {
      "id": "5d9d6b7edb1b24e15981055d",
      "title": "Pharmacon",
      "year": 1971
    },
    {
      "id": "5d9d6b7ea41c8e62d238a244",
      "title": "Bizmatic",
      "year": 2009
    },
    {
      "id": "5d9d6b7e1b5ec9f052193999",
      "title": "Visalia",
      "year": 1940
    },
    {
      "id": "5d9d6b7ea46cfe8608bbe797",
      "title": "Orbaxter",
      "year": 1972
    },
    {
      "id": "5d9d6b7e9ffd7d739957d7d6",
      "title": "Orbixtar",
      "year": 1956
    },
    {
      "id": "5d9d6b7ed9939d1454009735",
      "title": "Kidstock",
      "year": 2008
    },
    {
      "id": "5d9d6b7ebd190505e9e89bb8",
      "title": "Cuizine",
      "year": 2000
    },
    {
      "id": "5d9d6b7e783c24c6cc6a8b43",
      "title": "Terrasys",
      "year": 2015
    },
    {
      "id": "5d9d6b7e1687885ea1ab5ac1",
      "title": "Tsunamia",
      "year": 1921
    },
    {
      "id": "5d9d6b7e9aabe9309849d46e",
      "title": "Sunclipse",
      "year": 1946
    },
    {
      "id": "5d9d6b7ed20e2bcc3fbe310e",
      "title": "Gaptec",
      "year": 1990
    },
    {
      "id": "5d9d6b7ec61b769f20add58e",
      "title": "Softmicro",
      "year": 1954
    },
    {
      "id": "5d9d6b7e311de3a1c3346b0a",
      "title": "Rotodyne",
      "year": 1956
    },
    {
      "id": "5d9d6b7e02810171edcaaf9d",
      "title": "Furnitech",
      "year": 1971
    },
    {
      "id": "5d9d6b7e2ed955ebf248141f",
      "title": "Keeg",
      "year": 1992
    },
    {
      "id": "5d9d6b7eb297dd9cbce5da5c",
      "title": "Vitricomp",
      "year": 1949
    },
    {
      "id": "5d9d6b7e002f551caca93448",
      "title": "Amtas",
      "year": 1987
    },
    {
      "id": "5d9d6b7ea510deaece18d8b5",
      "title": "Comveyer",
      "year": 2007
    },
    {
      "id": "5d9d6b7ebe3889c418753a3d",
      "title": "Gluid",
      "year": 1912
    },
    {
      "id": "5d9d6b7efc707ec3f540bf9d",
      "title": "Cujo",
      "year": 2013
    },
    {
      "id": "5d9d6b7e5c7a731425716d0b",
      "title": "Yurture",
      "year": 1934
    },
    {
      "id": "5d9d6b7e921548fd16d6d0ba",
      "title": "Powernet",
      "year": 1976
    },
    {
      "id": "5d9d6b7e215d62f0d076ae9a",
      "title": "Senmao",
      "year": 1900
    },
    {
      "id": "5d9d6b7e7e6a8c7c32b73ac5",
      "title": "Indexia",
      "year": 1906
    },
    {
      "id": "5d9d6b7e488958518fe94bc6",
      "title": "Golistic",
      "year": 1905
    },
    {
      "id": "5d9d6b7e68147e0890f0dcd3",
      "title": "Kineticut",
      "year": 1966
    },
    {
      "id": "5d9d6b7e5cd30204dddaccba",
      "title": "Twiist",
      "year": 1980
    },
    {
      "id": "5d9d6b7e81ec104743cb52e9",
      "title": "Wrapture",
      "year": 1976
    },
    {
      "id": "5d9d6b7e3a3385814a55dfc0",
      "title": "Enervate",
      "year": 2019
    },
    {
      "id": "5d9d6b7e459f0fa2b4bfb0f6",
      "title": "Extremo",
      "year": 1987
    },
    {
      "id": "5d9d6b7e050817937f0d7ac0",
      "title": "Kenegy",
      "year": 1947
    },
    {
      "id": "5d9d6b7e6c4f6123b644c93f",
      "title": "Filodyne",
      "year": 2007
    },
    {
      "id": "5d9d6b7e24bda1bfb50c2833",
      "title": "Steeltab",
      "year": 2013
    },
    {
      "id": "5d9d6b7eb8742257fd3330c3",
      "title": "Mondicil",
      "year": 1954
    },
    {
      "id": "5d9d6b7eb9f39df7e57afa64",
      "title": "Motovate",
      "year": 2000
    },
    {
      "id": "5d9d6b7ef49c297b24091f88",
      "title": "Bluegrain",
      "year": 1954
    },
    {
      "id": "5d9d6b7ef6141e288eec88b5",
      "title": "Namegen",
      "year": 2009
    },
    {
      "id": "5d9d6b7ed1e819db95596e02",
      "title": "Verton",
      "year": 1902
    },
    {
      "id": "5d9d6b7e3c244b8adc9c7685",
      "title": "Genekom",
      "year": 1920
    },
    {
      "id": "5d9d6b7eaadb090d252a9964",
      "title": "Medesign",
      "year": 1955
    },
    {
      "id": "5d9d6b7ea140e241b5410630",
      "title": "Flumbo",
      "year": 1984
    },
    {
      "id": "5d9d6b7e6255daeb5e70893a",
      "title": "Metroz",
      "year": 2015
    },
    {
      "id": "5d9d6b7e9e696248ed7331f7",
      "title": "Malathion",
      "year": 1933
    },
    {
      "id": "5d9d6b7e5ca2f0315961212e",
      "title": "Calcu",
      "year": 1903
    },
    {
      "id": "5d9d6b7e072db4b14ddb784c",
      "title": "Sealoud",
      "year": 1941
    },
    {
      "id": "5d9d6b7ef64a60bb8f3e7e20",
      "title": "Waterbaby",
      "year": 1924
    },
    {
      "id": "5d9d6b7e88b027d76ae65592",
      "title": "Cosmosis",
      "year": 1917
    },
    {
      "id": "5d9d6b7e84d5331099d1c3d9",
      "title": "Vinch",
      "year": 1945
    },
    {
      "id": "5d9d6b7eb524d4b16544aab0",
      "title": "Callflex",
      "year": 1935
    },
    {
      "id": "5d9d6b7efdbfd7cbd52260f5",
      "title": "Futuris",
      "year": 1967
    }
  ]
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
  },
];

export default class Queries extends React.Component {

    getPaginationOptions(){
        return { 
            rowsPerPageText: 'Filas por página:', 
            rangeSeparatorText: 'de' 
        }
    }

    render(){

        return (
            <div id="queries-page">
                <h2>Haz tu consulta</h2>
                <div className="queries-container">
                  <textarea className="queries-textarea"/>
                  <PrimaryButton className="queries-submit-button">
                    Consultar
                  </PrimaryButton>
                  <p className="queries-result-box">Actualizacion ejecutada satisfactoriamente.</p>
                </div>
                <h2>Resultados</h2>
                <div className="queries-table-wrapper">
                    <DataTable className="queries-table"
                        columns={columns}
                        data={data}
                        pagination
                        paginationComponentOptions={this.getPaginationOptions()}
                    />
                </div>
            </div>
        );

    }

}