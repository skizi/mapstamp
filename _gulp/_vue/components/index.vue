<template>
  <div class="wrapper">


    <header>
      <div class="inner">
        <a href="javascript:void(0);" class="prev" v-if="this.$store.getters.nowState != 'about'" @click="prevBtnClick">戻る</a>
        <h2>
          <img src="./assets/images/header/logo.png" alt="MapStamp マップスタンプ">
        </h2>
        <h1>位置情報共有サービス マップスタンプ</h1>
        <a href="javascript:void(0);" class="next" v-if="this.$store.getters.nowState != 'share'" @click="nextBtnClick">次へ</a>
      </div>
    </header>

    
    nowState:{{this.$store.getters.nowState}}
    <div class="container">

      <map-vue :now-state="nowState"></map-vue>
      

      <div class="interface">

        <about v-if="this.$store.getters.nowState == 'about'"></about>
        <capture v-else-if="this.$store.getters.nowState == 'capture'"></capture>
        <editor v-else-if="this.$store.getters.nowState == 'editor'"></editor>
        <text-editor v-else-if="this.$store.getters.nowState == 'textEditor'"></text-editor>
        <animation-editor v-else-if="this.$store.getters.nowState == 'animationEditor'"></animation-editor>
        <share v-else-if="this.$store.getters.nowState == 'share'"></share>

      </div>

    </div>


    <footer>
      <div class="inner">
        <div class="left">
          <img src="./assets/images/footer/logo.png" alt="MapStamp マップスタンプ">
        </div>
        <div class="right">
          <nav>
            <ul>
              <li>
                <a href="#help" >よくある質問</a>
              </li>
              <li>
                <a href="#rule" >利用規約</a>
              </li>
              <li>
                <a href="#privacypolicy" >プライバシーポリシー</a>
              </li>
              <li>
                <a href="#info" >運営者情報</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <p class="copy"><a href="http://skizi.jp" target="_blank">&copy;夕暮れソフト</a></p>
    </footer>  
  </div>

</template>


<style lang="sass">
@import "../../_scss/_vars.scss";

/*-----------------header--------------------*/
header{
    width:100%;
    height:60px;
    background-color:#fff;
    border-bottom:3px solid #ebb314;
    box-sizing:border-box;
    box-shadow:0px 0px 3px 3px rgba(1,1,1,0.1);

    .inner{
        margin:0 auto;
        position:relative;
    }

    h2{
        width: 118px;
        margin: 0 auto;
        padding: 9px 0 6px;

        img{
            width:100%;
        }
    }

    h1{
        width: 100%;
        font-size: 10px;
        text-align: center;
        color: #ebb314;
    }



    a.prev,
    a.next{
        position: absolute;
        right: 20px;
        top: 23px;
        text-decoration: none;
        color: #ff8e73;
        font-size: 14px;

        &:visited,
        &:link{
            color: #ff8e73;
        }

        &.prev{
            left: 20px;
            right: auto;
        }
    }


    a.login_btn{
        width: 100px;
        height: 36px;
        line-height: 36px;
        background-color: #ebb313;
        display: block;
        position: absolute;
        top: 13px;
        right: 13px;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        text-decoration: none;
        font-size: 13px;
        display: none;
    }

    a.main_menu_btn{
        width: 24px;
        height: 13px;
        display: block;
        position: absolute;
        top: 24px;
        left: 25px;

        img{
            width:100%;
        }
    }
}


@media screen and (min-width: 375px) {
    
    header{
        width:100%;

        .inner{
            width:380px;
        }

        a.login_btn{
            transition-duration: 0.3s;
            transition-property: opacity;

            &:hover{
                opacity: 0.7;
            }
        }
    }
}


/*-----------------footer--------------------*/
footer{
    width:100%;
    padding-bottom: 10px;
    border-top:2px solid #ebb314;

    div.inner{
        @include clearfix;
        min-height: 120px;

        div.left{
            width: 50%;
            margin-left:25px;
            padding-top:29px;
            float:left;

            img{
                width:118px;
            }
        }

        div.right{
            padding-top:29px;
            margin-left: 21px;
            float:left;

            nav ul{
                li{
                    margin-bottom: 0px;
                    list-style: none;
                    position:relative;
                    height: 16px;
                    line-height: 16px;

                    &:after{
                        content:'';
                        width: 2px;
                        height: 2px;
                        display: block;
                        background-color: #a7a7a7;
                        position:absolute;
                        left:-10px;
                        top: 8px;
                    }

                    a{
                        color:#a7a7a7;
                        font-size:10px;
                        text-decoration: none;
                    }  
                }
            }
        }
    }

    p.copy{
        color: #a7a7a7;
        text-align:center;

        a{
            text-decoration: none;
            font-size:10px;
        }
    }
}

@media screen and (min-width: 375px) {

    footer{
        width:100%;

        div.inner div.left{
            width: 40%;
            margin-left: 16%;
        }

        div.inner div.left,
        div.inner div.right,
        p.copy{

            a{
                transition-duration: 0.3s;
                transition-property: opacity;

                &:hover{
                    opacity: 0.7;
                }
            }
        }

        div.inner{
            width: 400px;
            margin:0 auto;
            min-height: 140px;
            
            div.left{
                width: auto;
                margin-left: 30px;
            }

            div.right{
                min-width: auto;
                margin-right: 30px;
                float: right;
            }
        }
    }

}


/*-----------------other--------------------*/
.interface{
  padding: 20px 10px 40px;
}


@media screen and (min-width: 375px) {
  body.home_index{
    .container{
      padding-top:20px;
    }
  }
}
</style>


<script>
import Vue from 'vue';
import MapVue from './map-vue';
import About from './about';
import Capture from './capture';
import Editor from './editor';
import TextEditor from './text-editor';
import AnimationEditor from './animation-editor';
import Share from './share';


module.exports = {

  name: 'Index',

  components: {
    'map-vue': MapVue,
    'about': About,
    'capture': Capture,
    'editor' : Editor,
    'text-editor' : TextEditor,
    'animation-editor' : AnimationEditor,
    'share' : Share
  },

  data: function () {
    return {
      nowState: this.$store.getters.nowState
    }
  },

  mounted: function() {

    // alert( this.nowState );

    this.states = [ 'about', 'capture', 'editor', 'textEditor', 'animationEditor', 'share' ];

  },


  watch: {

    nowState : function( f, t ){
      console.log(t);
    }
    

  },


  methods : {

    nextBtnClick : function(){

        this.changeState( 1 );

        
    },

    prevBtnClick : function(){

        this.changeState( -1 );

    },


    changeState : function( adjustIndex ){

        let state = this.$store.getters.nowState;
        let nextIndex = this.states.indexOf( state ) + adjustIndex;
        let nextState = this.states[ nextIndex ];

        if( nextState ){
            this.$store.commit( 'nowState', nextState );
        }

    }

  }


  // props : {
  //   nowState : String
  // }

};

</script>

