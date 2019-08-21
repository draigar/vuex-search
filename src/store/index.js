import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex);

// here we create regular expressions for the search keywords
// eslint-disable-next-line
const acents = string => {
    const mapAcents = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g
    };
    for(let letter in mapAcents) {
        var regx = mapAcents[letter];
        // replace the expressions 
        string = string.replace(regx, letter);
    }

    return string;
};

// our vuex store referenced here
export const store = new vuex.Store({
    state: {
        //empty array to hold our search keywords
        search: {},
        searches: [
            {name: 'Lagos state', population: '20 Million', governor: 'Sanwo Olu', searched_before: false},
            {name: 'Ogun state', population: '10 Million', governor: 'John Olu', searched_before: false},
            {name: 'Kwara state', population: '80 Million', governor: 'Doe Olu', searched_before: false},
            {name: 'Enugu state', population: '30 Million', governor: 'Jane Olu', searched_before: false}
        ],
        searchWord: null,
        filteredSearch: null
    },
    getters : {
        allSearches: state => state.searches,
        getSearch: state => state.search,
        getSearchWord: state => state.searchWord,
        getFilteredSearch: state => state.filteredSearch
    },
    mutations: {
        // here we set the search
        SET_SEARCH(state, search) {
            state.search = search;
        },
        // here we filter the search
        FILTERED_SEARCHES(state, word) {
            // we first check if the input field is empty or not
            if(!word || word === "{}") {
                state.searchWord = null;
                state.filteredSearch = null;
            }else {
                // if not process the search
                state.searchWord = word;
                // the search wor is the trimed to lowercase
                word = acents(word.trim().toLowerCase());
                // now we return the search after filtering through the above defined details to search from
                state.filteredSearch = state.searches.filter(search => {
                    return (
                        search.population.toLowerCase().includes(word) ||
                        search.governor.toLowerCase().includes(word) ||
                        search.name.toLowerCase().includes(word)
                        //search.searched_before.toLowerCase().includes(word)
                    );
                });
            }
        }
    },
    actions : {
        // here we commit the search to show on the search result page
        SET_SEARCH({ commit }, search) {
            commit("SET_SEARCH", search);
        },
        FILTERED_SEARCHES({ commit }, word) {
            commit("FILTERED_SEARCHES", word);
        }
    }
});