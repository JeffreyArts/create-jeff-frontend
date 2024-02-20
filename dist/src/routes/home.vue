<template>
    <div class="home">
        <section class="container">
            
            <h1 class="home-title">
                <span class="left">
                    {{ $t('route::home.title') }}
                </span>
                <span class="right">
                    <languageSelector />
                </span>
            </h1>
            
            <ascii-line character="╤"/>
            
            <div class="home-description">
                <p>
                    {{ $t('route::home.description[0]') }}
                </p>
                <p v-html="$t('route::home.description[1]')" />
            </div>
            
            
            <ascii-line class="divider-line" character="="/>
            
            <div class="strapi-test">
                
                <h1>{{ $t('route::home.strapi-test.title') }}</h1>
                <em>{{ $t('route::home.strapi-test.subtitle') }}</em>
                <br>
                <br>
                <rest-demo />

                <details>
                    <summary>{{ $t('route::home.strapi-test.details.title') }}</summary>
                    <p>{{ $t('route::home.strapi-test.details.subtitle') }}</p>
                    <ul>
                        <li>{{ $t(`route::home.strapi-test.details.paths[0]`) }}</li>
                        <li>{{ $t(`route::home.strapi-test.details.paths[1]`) }}</li>
                        <li>{{ $t(`route::home.strapi-test.details.paths[2]`) }}</li>
                        <li>...</li>
                    </ul>
                    <p>
                        <span v-html="$t(`route::home.strapi-test.details.footnote`, { adminUrl}) " />&nbsp;
                        <span class="highlight">Settings</span> &gt; <span class="highlight">Users & Permissions plugin</span> &gt; <span class="highlight">Roles</span></p>
                </details>
            </div>

            <ascii-line class="divider-line" character="~"/>

            <div class="strapi-test">
                <h1>{{ $t('route::home.strapi-auth-test.title') }}</h1>
                <div class="test-auth-container">

                    <div class="test-auth-section">
                        <div class="unauthenticated" v-if="!Strapi.self && !confirmMessage">
                            <h3>{{ $t('route::home.strapi-auth-test.login') }}</h3>
                            <authentication @requestPasswordSuccess="showConfirmMessage"/>
                        </div>
                        <div class="authenticated" v-if="Strapi.self && !confirmMessage">
                            <h3>{{ $t('route::home.strapi-auth-test.welcome', { username: Strapi.self.username}) }}</h3>
                            <ascii-button @click="logout">
                                {{ $t('route::home.strapi-auth-test.logout') }}
                            </ascii-button>
                        </div>
                        <div v-if="confirmMessage">
                            {{ $t('route::home.strapi-auth-test.confirmMessage', { confirmMessage }) }}
                        </div>
                    </div>
                    <div class="test-auth-section">
                        <div class="unauthenticated" v-if="!Strapi.self">
                            
                            <h3>{{ $t('route::home.strapi-auth-test.registerAccount') }}</h3>
                            <register />
                        </div>
                        <pre v-if="Strapi.self">{{ Strapi.self }}</pre>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import strapiStore from "@/stores/strapi"
import gsap from "gsap"
import asciiLine from "@/components/ascii-line.vue"
import asciiButton from "@/components/ascii-button.vue"
import restDemo from "@/components/rest-demo.vue"
import register from "@/components/auth/register.vue"
import languageSelector from "@/components/language-selector.vue"
import authentication from "@/components/auth/login.vue"

export default defineComponent ({ 
    name: "homePage",
    components: { 
        asciiLine,
        asciiButton,
        restDemo,
        languageSelector,
        authentication,
        register 
    },
    props: [],
    setup() {
        const Strapi = strapiStore()

        return { Strapi }
    },
    data() {
        return {
            confirmMessage: "",
            consoleEvents: [] as Array<string>,
            adminUrl: `${import.meta.env.VITE_STRAPI_REST_ENDPOINT}/admin/settings/users-permissions/roles`
        }
    },
    head: { 
        title: "Home",
        meta: [
            {
                name: "description",
                content: "Lorem ipsum dolor samet...",
            },
        ]
    },
    mounted() {
        gsap.fromTo(".home-title .right", {
            opacity: 0, 
            x: 24
        }, {
            opacity: 1, 
            x:0, 
            ease: "elastic.out(1, 0.3)",
            duration: 2.4
        })
        gsap.fromTo(".home-description, .divider-line,  .strapi-test", {
            opacity: 0, 
            y: 24
        }, {
            opacity: 1, 
            y:0, 
            ease: "circ.out",
            duration: .64,
            stagger: .16
        })
    },
    methods: {
        logout() {
            this.Strapi.logout()
        },
        showConfirmMessage(email:string) {
            this.confirmMessage = email
        }
    }
})

</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.home {
    min-height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;


    // BAD PRACTICE
    // I generally discourage others to use class prefixes instead of doing this kind of bubbling.
    // I have good reasons though to not follow my own advice here.
    // If you want to know why, send me a message.
    pre {
        display: inline-block;
        background-color: $textColor;
        color: $white;
        padding: 8px;
        border-radius: 4px;
        margin: 0;
        cursor: pointer;
    }
    .highlight {
        display: inline-block;
        padding: 0 5px;
        background-color: #eee;
        border-radius: 3px;        
    }
}

.strapi-test {
    margin: 24px 0;
}

.test-auth-section {
    width: 100%;
    
    .auth-form-field,
    .register-form-field {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 16px;
    }
    label {
        display: inline-block;
        width: 144px;
    }
    .auth-form-field,
    .register-form-field {
        margin-bottom: 8px;
    }
    input {
        width: calc(100% - 144px);
    }

    @media (min-width: 640px) {
        width: 50%;
    }
}
.test-auth-container {
    width: 100%;
    display: flex;
    gap: 32px;
}

.home-title {
    width: 100%;
    font-size:16px;
    font-weight: normal;
    display:flex;
    justify-content: space-between;

    .icon {
        height: 1.2em;
        translate: -8px 4px;
        display: inline-block;
    }   
    .left {
        font-weight: bold;
        display: inline-block;
    }
    .right {
        display: inline-block;
    }
}

.home-button-right {
    float: right;
}

.home-description {
    position: relative;
    z-index: -1;
    padding: 32px 0;
}

.home-console {
    width: 100%;
    display: block;
}

.home-console-entry {
    display: inline-block;
    width: 100%;
    &:before {
        content: "> ";
        font-weight: bold;
    }
}
</style>