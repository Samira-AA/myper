import {defineStore} from "pinia";
import {UserApiService} from "../services/user.service.js";
import {User} from "../models/user.model.js";

export const useUserStore = defineStore('userStore',{
    state:() => ({
        users: [], //user list
        loading: false, // loading state for UI
        error: null // error state for UI
    }),

    getters:{
        getNextId (state){

            // for the first user, return id 1
            if(state.users.length === 0){
                return 1;
            }

            // for subsequent users, return the next id based on the last user's id
            let maxId = 0;
            state.users.forEach(user => {
                if (user.id > maxId) {
                    maxId = user.id;
                }
            });
            return maxId+1;
        }
    },

    actions:{
        async getUsers() {
            this.loading = true;
            this.error = null;

            try{
                const userApiService = new UserApiService();
                const response = await userApiService.getUsers();
                console.log('API Response:', response.data);
                this.users = response.data;
            }catch(error){
                this.error = 'Error fetching users: ' + error.message;
                console.log('Error fetching users:', error);
            } finally {
                this.loading = false;
            }
        },

        addUser(userData){
            if (!userData.email.includes('@')) {
                throw new Error('Invalid email');
            }
            const id = this.getNextId;
            const newUser = new User({
                id,
                name: userData.name,
                username: userData.username,
                email: userData.email,
                phone: userData.phone
            });
            this.users.push(newUser);
            return newUser;
        },

        updateUser(updatedUserData) {
            const userPosition = this.users.findIndex(u => u.id === updatedUserData.id);

            if (userPosition >= 0) {
                this.users[userPosition] = new User(updatedUserData);
            }
        },

        deleteUser(userId) {
            this.users = this.users.filter(user => user.id !== userId);
        }

    }

})