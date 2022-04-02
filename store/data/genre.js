
export const state = () => ({
    map : {}
});

export const mutations = {
    saveGenreList(state, data) {
       let obj = {};
       for (let i=0;i<data.length;i++){
           obj[data[i].id] = data[i].name;
       }
       state.map = obj;
    },
};

export const actions = {};
