<script setup>
//import HeaderTop from "./components/HeaderTop.vue"

</script>

<template>
  <header> 
    <HeaderTop title="My cool App" buttoncta="Create app" /> <!--pass multiple parameters-->
    <HeaderTop title="Todo list" buttoncta="Add task" titleColor="blue" />
  </header>

  <main>
    <div id="profile-container">
      <div v-show="!isEditMode">
        <h1>User profile</h1>
        <img class="profile-img" src="./assets/prettiest_cat_on_earth.png" alt="prettiest cat on earth">
          <div class="data-line">
            <span>Name: </span><b>{{ userName }}</b> <!-- span is a inline element, p and div are block elements -->
          </div>
        <hr> <!-- this is a line element -->
          <div class="data-line">
            <span>Email: </span><b>{{ userEmail }}</b>
          </div>
        <hr>
          <div class="data-line">
            <span>Interests: </span><b>{{ userInterests }}</b>
          </div>
        <hr>  
        
        <button @click="handleEditProfile">
          Edit Profile
        </button>
      </div>
  
      <div v-show="isEditMode">
        <h1>Edit profile</h1>
        <img class="profile-img" src="./assets/prettiest_cat_on_earth.png" alt="prettiest cat on earth">
          <div class="data-line">
            <span>Name: </span>
            <input type="text" v-model="userName">
          </div>
        <hr>
          <div class="data-line">
            <span>Email: </span>
            <input type="email" v-model="userEmail">
          </div>
        <hr>
          <div class="data-line">
            <span>Interests: </span> 
            <input type="text" v-model="userInterests">
          </div>
        <hr>
    
        <button @click="handleUpdateProfile">
          Update Profile
        </button>
      </div>
    </div>
  </main>
</template>

<style>
body {
    margin: 0px;
}

/*div {
    border: 1px solid black;
}*/

button {
    width: 150px;
    height: 40px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: darkcyan;
    color: white;

}

button:hover {
    background: lightpink;
    cursor: pointer;
}

input {
    width: 200px;
    padding: 5px;
}

h1  {
  color: darkcyan;
}

#profile-container {
    width: 50%;
    margin: 40px auto;
}

.profile-img {
    width: 100%;
    margin-bottom: 40px;
    display: block;
}

.data-line {
    display: flex;
    align-items: center;
    height: 35px;
    margin: 20px 0px;
    
}

.data-line span {
    margin-right: 5px;
}

</style>

<script>

export default {
  data() {
    return {
      userName: "",
      userEmail: "",
      userInterests: "",
      isEditMode: false
    }
  },
  async created() { // this gets executed on load (app component creation)
    const userData = await this.getUserData(); //this. is for telling use in this component
    this.userName = userData.userName
    this.userEmail = userData.userEmail
    this.userInterests = userData.userInterests
  },
  methods: {
    handleEditProfile() {
      this.isEditMode = true

      },
    async handleUpdateProfile() {
      const payload = {
        userName: this.userName,
        userEmail: this.userEmail,
        userInterests: this.userInterests
      }
      const resJson = await this.updateUserData(payload)
      console.log(resJson) 
      this.isEditMode = false
    },
    async getUserData() {
      const get = await fetch("get-profile-data", {
        method: "GET"
      })
      return await get.json()
    },
    async updateUserData(payload) {
      const update = await fetch("update-profile-data", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload) // JSON.stringify = convert JS data to JSON
        
      })
      return await update.json()
    }
  }
}

</script>


