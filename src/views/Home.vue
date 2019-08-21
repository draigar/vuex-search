<template>
    <div>
        <h1>Welcome To Test Search Engine</h1>
        <div class="searchBox">
            <form>
                <input id="search" type="search" v-model="searchWord" required>
                <p>You searched for {{ searchWord }}</p>
            </form>
            <div class="searchResult">
                <div class="result" v-for="(search, key) in filteredSearch" :key="key">
                    {{search.name}} has a population of ({{search.population}}), and it's Governor is 
                    "{{search.governor}}"
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data: ()=> {
        return {
            // searchWord:'',
        }
    },
    computed: {
        filteredSearch() {
            try {
                let a = this.$store.getters.getFilteredSearch;
                //console.log(a);
                return a;
            }catch(e) {
                console.log(e);
            }
        },
        searchWord: {
            get() {
                return this.$store.state.searchWord;
            },
            set(value) {
                this.$store.dispatch("FILTERED_SEARCHES", value);
            }
        }
    }
}
</script>

<style scoped>
    .searchBox {
        float: left;
        width: 100%;
        padding: 10px;
    }
    .searchBox button {
        padding: 10px 20px;
        background-color: aquamarine;
        color: #fff;
        border-radius: 3px;
        border:none;
        margin: 0 10px;
        cursor: pointer;
        box-shadow: 0 3px 8px rgba(0, 0, 0, .3);
    }
    .br {
        border:solid 1px #000;
    }
    .searchBox input {
        width: 80%;
        padding: 10px 20px;
        border:none;
        background-color: aliceblue;
        border-radius: 3px;
        box-shadow: 0 3px 8px rgba(0, 0, 0, .3);
    }
    .searchResult {
        width: 70%;
        margin: 20px auto;
    }
    .searchResult .result {
        float: left;
        width: 100%;
        padding: 10px;
        background-color: antiquewhite;
        box-shadow: 0 5px 8px rgba(0, 0, 0, .3);
        border-radius: 4px;
        margin-bottom: 10px;
    }
</style>