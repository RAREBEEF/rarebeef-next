if(!self.define){let e,i={};const a=(a,n)=>(a=new URL(a+".js",n).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const r=e=>a(e,c),f={module:{uri:c},exports:o,require:r};i[c]=Promise.all(n.map((e=>f[e]||r(e)))).then((e=>(s(...e),o)))}}define(["./workbox-6a1bf588"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/6Barqsr3-uSTlWbZ8giNi/_buildManifest.js",revision:"1f8fe2e1a28d0e9cc867fe6d5d64f187"},{url:"/_next/static/6Barqsr3-uSTlWbZ8giNi/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/203.0d97db8333e349b2.js",revision:"0d97db8333e349b2"},{url:"/_next/static/chunks/413-faec0ab60db7fbf3.js",revision:"faec0ab60db7fbf3"},{url:"/_next/static/chunks/5361625a-0f3595ec2bcae6a3.js",revision:"0f3595ec2bcae6a3"},{url:"/_next/static/chunks/622-c6f933eeb64cc129.js",revision:"c6f933eeb64cc129"},{url:"/_next/static/chunks/675-a11759bef75ff817.js",revision:"a11759bef75ff817"},{url:"/_next/static/chunks/805-c3de52bd68f58ea1.js",revision:"c3de52bd68f58ea1"},{url:"/_next/static/chunks/894.8b3e79a97f1244f1.js",revision:"8b3e79a97f1244f1"},{url:"/_next/static/chunks/94726e6d-f1d4781b872bf30e.js",revision:"f1d4781b872bf30e"},{url:"/_next/static/chunks/990-090a3371a3a6364b.js",revision:"090a3371a3a6364b"},{url:"/_next/static/chunks/fb7d5399-5a198da91eb1c576.js",revision:"5a198da91eb1c576"},{url:"/_next/static/chunks/framework-3b5a00d5d7e8d93b.js",revision:"3b5a00d5d7e8d93b"},{url:"/_next/static/chunks/main-1c65806f084044fd.js",revision:"1c65806f084044fd"},{url:"/_next/static/chunks/pages/404-dbea4936d6f0843b.js",revision:"dbea4936d6f0843b"},{url:"/_next/static/chunks/pages/_app-6bb496f629f1e0be.js",revision:"6bb496f629f1e0be"},{url:"/_next/static/chunks/pages/_error-4b61be14865575c5.js",revision:"4b61be14865575c5"},{url:"/_next/static/chunks/pages/about-7129c705cf48bc18.js",revision:"7129c705cf48bc18"},{url:"/_next/static/chunks/pages/admin-2953c17c3010cbf2.js",revision:"2953c17c3010cbf2"},{url:"/_next/static/chunks/pages/contact-aa14152d46b61314.js",revision:"aa14152d46b61314"},{url:"/_next/static/chunks/pages/index-dfa0daa2b69c3503.js",revision:"dfa0daa2b69c3503"},{url:"/_next/static/chunks/pages/projects/%5Bid%5D-8a9955edda926d6a.js",revision:"8a9955edda926d6a"},{url:"/_next/static/chunks/pages/projects/huggywuggy-88c36f4413383e81.js",revision:"88c36f4413383e81"},{url:"/_next/static/chunks/pages/projects/reactnative-84d2ca250c55d82d.js",revision:"84d2ca250c55d82d"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-eb97639d6d09ba1c.js",revision:"eb97639d6d09ba1c"},{url:"/_next/static/css/818cc91da70ce189.css",revision:"818cc91da70ce189"},{url:"/_next/static/css/8258ec23520ba9ea.css",revision:"8258ec23520ba9ea"},{url:"/_next/static/css/99209c1b390471ce.css",revision:"99209c1b390471ce"},{url:"/_next/static/css/a23a5772c35fd339.css",revision:"a23a5772c35fd339"},{url:"/_next/static/css/aa63406264f3dc31.css",revision:"aa63406264f3dc31"},{url:"/_next/static/css/b0860fe8f593a107.css",revision:"b0860fe8f593a107"},{url:"/_next/static/css/f9454489728b8dd3.css",revision:"f9454489728b8dd3"},{url:"/_next/static/css/fecf239682392f2a.css",revision:"fecf239682392f2a"},{url:"/animation/beef_animation_0000.jpg",revision:"350cd4b997779988483a68f52c171597"},{url:"/animation/beef_animation_0001.jpg",revision:"3ea39a6e11f76ea96a06c9aa4731d635"},{url:"/animation/beef_animation_0002.jpg",revision:"e164abb84715360d80ddfbe2ce494c8d"},{url:"/animation/beef_animation_0003.jpg",revision:"71a1dede481237a7bf44eeb5e6d6b8f0"},{url:"/animation/beef_animation_0004.jpg",revision:"22ea1f44a9e21c658fb4fb968a1ca450"},{url:"/animation/beef_animation_0005.jpg",revision:"a93409405164baf60b513adcd4a55744"},{url:"/animation/beef_animation_0006.jpg",revision:"c9ba708d0a00b94ad9f92398c10ac8d0"},{url:"/animation/beef_animation_0007.jpg",revision:"3c73b5387f62db313b3d52714fa2b202"},{url:"/animation/beef_animation_0008.jpg",revision:"d4278b10df9334ff3374ea5fab4fd0b5"},{url:"/animation/beef_animation_0009.jpg",revision:"0751cd65aed610c691221adac15acd57"},{url:"/animation/beef_animation_0010.jpg",revision:"7b28235c06dcbd6632939bf6fb1d61b0"},{url:"/animation/beef_animation_0011.jpg",revision:"0156eafd3d24ae9fcb283982f54d9e76"},{url:"/animation/beef_animation_0012.jpg",revision:"a9225ed14d2afc230edd0bb31f797851"},{url:"/animation/beef_animation_0013.jpg",revision:"c2133bc9eb5210d05fe313339cbbb02a"},{url:"/animation/beef_animation_0014.jpg",revision:"6f5d5fe334ea98f738485952fb53bae3"},{url:"/animation/beef_animation_0015.jpg",revision:"528f12713bc816ed1df8f65d002dd985"},{url:"/animation/beef_animation_0016.jpg",revision:"322ad9114e1f74d7b48ea9b157aadeb3"},{url:"/animation/beef_animation_0017.jpg",revision:"a621c10bc909cc18ed5d9e9802ee020c"},{url:"/animation/beef_animation_0018.jpg",revision:"211e42310cd1ba0f27e1a9c35561eb17"},{url:"/animation/beef_animation_0019.jpg",revision:"d47fe1976a324248f75dff9c3d6d1ea3"},{url:"/animation/beef_animation_0020.jpg",revision:"368b25bd8e67611b9b727987640ec128"},{url:"/animation/beef_animation_0021.jpg",revision:"bccb0856dbdf8a3275596745de5a0fdb"},{url:"/animation/beef_animation_0022.jpg",revision:"32bbbedcf7b6defe2727f77131012ebe"},{url:"/animation/beef_animation_0023.jpg",revision:"fe00920a6fefa3ea20502fe98fee63ba"},{url:"/animation/beef_animation_0024.jpg",revision:"33ff1c39985416ba3fc54eb890e130f1"},{url:"/animation/beef_animation_0025.jpg",revision:"d5b76e9e3ca7e484c802c9041a692a50"},{url:"/animation/beef_animation_0026.jpg",revision:"c67676c275576c8d468cf5ed211cf236"},{url:"/animation/beef_animation_0027.jpg",revision:"1563e19f2ec1aca79e817164c963aa5f"},{url:"/animation/beef_animation_0028.jpg",revision:"be163fb840fdfdf7b53869ee21af4189"},{url:"/animation/beef_animation_0029.jpg",revision:"e3fab5b28a5d75c63fe041c4041281b0"},{url:"/animation/beef_animation_0030.jpg",revision:"1c28ddc6a0e792a2fbd4cc6dac6aff76"},{url:"/animation/beef_animation_0031.jpg",revision:"44b6b66bad01ae58473b37d5a01a2bb2"},{url:"/animation/beef_animation_0032.jpg",revision:"badb2d8766028c5d93946db9e1774ddb"},{url:"/animation/beef_animation_0033.jpg",revision:"dc2b1b57b494116fdf70c22f074c5899"},{url:"/animation/beef_animation_0034.jpg",revision:"873efb21756c5b495806fc96b7ce01f2"},{url:"/animation/beef_animation_0035.jpg",revision:"a662ad003951a51eb6d6a622c2d15cff"},{url:"/animation/beef_animation_0036.jpg",revision:"222136905966ee9b09532b128f0e382d"},{url:"/animation/beef_animation_0037.jpg",revision:"3e0b4438ee45fa83c356cc4e2228f691"},{url:"/animation/beef_animation_0038.jpg",revision:"8e866291010f96b78d1ff770738652b7"},{url:"/animation/beef_animation_0039.jpg",revision:"4f95fbec91f40fa453709071acf96cec"},{url:"/animation/beef_animation_0040.jpg",revision:"f60fceb2c853cfd64e482b8567a682a1"},{url:"/animation/beef_animation_0041.jpg",revision:"b9be6319fe5c422902bd837c5d65039a"},{url:"/animation/beef_animation_0042.jpg",revision:"f95d34d8901ef71d0b235ace07a6dc01"},{url:"/animation/beef_animation_0043.jpg",revision:"bbb17024cbe7e622aec00d1737a1ad00"},{url:"/animation/beef_animation_0044.jpg",revision:"a19bb81b59f95b5736de9bce454708cd"},{url:"/animation/beef_animation_0045.jpg",revision:"ec7d9aba34a69bd39a6e3085537b01e0"},{url:"/animation/beef_animation_0046.jpg",revision:"1070bb085149b6bb4e1f8c69ce362d94"},{url:"/animation/beef_animation_0047.jpg",revision:"1f695feb17d07fdfa72ab5adef89ea80"},{url:"/animation/beef_animation_0048.jpg",revision:"5d7b12c40872654ade6dc72edbc52b86"},{url:"/animation/beef_animation_0049.jpg",revision:"a007262879cffda3f1a058e56689dd74"},{url:"/animation/beef_animation_0050.jpg",revision:"730bf2e0a970076014741c8eb8a48393"},{url:"/animation/beef_animation_0051.jpg",revision:"ac609ef4e2ac64fc683389f3728f5db6"},{url:"/animation/beef_animation_0052.jpg",revision:"98a67066827046fdd135ece8edb2d699"},{url:"/animation/beef_animation_0053.jpg",revision:"9c32b380e75b87f2524d3db8eb02ebbd"},{url:"/animation/beef_animation_0054.jpg",revision:"67fad0530ab59d93839b5f6208bc192c"},{url:"/animation/beef_animation_0055.jpg",revision:"11e44f45ed63449121d3871bfb139191"},{url:"/animation/beef_animation_0056.jpg",revision:"d761a35af1c5a7f33f69690fa101a280"},{url:"/animation/beef_animation_0057.jpg",revision:"776f2a7091f64bf775e0c2a38dfbffb1"},{url:"/animation/beef_animation_0058.jpg",revision:"8feb3eb4920da376e2cb2df1728e00ed"},{url:"/animation/beef_animation_0059.jpg",revision:"31bfea2d27a7f3632bd60c4b651015ac"},{url:"/animation/beef_animation_0060.jpg",revision:"8e59983a2819faae3cdc424736fe05a5"},{url:"/animation/beef_animation_0061.jpg",revision:"964869329ad6b0cfc8d7d36117dfa2e5"},{url:"/animation/beef_animation_0062.jpg",revision:"3c1c91a0806ea558ec84fe8dfc1e1e73"},{url:"/animation/beef_animation_0063.jpg",revision:"fded7435cfc83131773b82846965c64a"},{url:"/animation/beef_animation_0064.jpg",revision:"583b4ad2d25f7ccb906f88db4cb49de0"},{url:"/animation/beef_animation_0065.jpg",revision:"c008f26ac3756be557364ce15c30f2ee"},{url:"/animation/beef_animation_0066.jpg",revision:"013cb2b014b0cd4c3ae75f392cdac0e9"},{url:"/animation/beef_animation_0067.jpg",revision:"17a377794adf65e2b2d92f4d44c18cc3"},{url:"/animation/beef_animation_0068.jpg",revision:"ff5ecc5304037285143caf38c56b7df8"},{url:"/animation/beef_animation_0069.jpg",revision:"0d4c530eab5ab224e1001c72a107a68a"},{url:"/animation/beef_animation_0070.jpg",revision:"562df3273c488d275f429c983f990f97"},{url:"/animation/beef_animation_0071.jpg",revision:"30990f54e7c123123301f4677e683a2c"},{url:"/animation/beef_animation_0072.jpg",revision:"ce5f71ba53ba3708c7b381baaae1fb39"},{url:"/animation/beef_animation_0073.jpg",revision:"39f0d804b9c22f202d40964d95cc6cba"},{url:"/animation/beef_animation_0074.jpg",revision:"0ed0385604b9b48996543d89270e9f1f"},{url:"/animation/beef_animation_0075.jpg",revision:"df9ab83f85d96bd21d2dbdb0dc3a89eb"},{url:"/animation/beef_animation_0076.jpg",revision:"ef63c435f96421e59963b4854a93c484"},{url:"/animation/beef_animation_0077.jpg",revision:"bdea509df08c7cdbea4df35b298532eb"},{url:"/animation/beef_animation_0078.jpg",revision:"f05b0a2d553d9a3f75259b67abdf21e7"},{url:"/animation/beef_animation_0079.jpg",revision:"bbf9f9f8f085924b5a065d67eef04bf5"},{url:"/animation/beef_animation_0080.jpg",revision:"ec622586ec46fef39fb8229e3e9f5895"},{url:"/animation/beef_animation_0081.jpg",revision:"01a4d64949b85cce4cf1993e2c678412"},{url:"/animation/beef_animation_0082.jpg",revision:"28f946c2f8e18582b270264df0f736b7"},{url:"/animation/beef_animation_0083.jpg",revision:"6ae7c98ea0146f1c1a034607ef95cceb"},{url:"/animation/beef_animation_0084.jpg",revision:"db74bd45eafcc19f14bf681fdb60bef7"},{url:"/animation/beef_animation_0085.jpg",revision:"72c0326b9870e0eaad51f96b9c7e5edc"},{url:"/animation/beef_animation_0086.jpg",revision:"a943db245d842d5e4fdd9520ce7a5ad4"},{url:"/animation/beef_animation_0087.jpg",revision:"9acd3815f29a97d0f35a0d46fa6cad87"},{url:"/animation/beef_animation_0088.jpg",revision:"b7591fc7e028769369167df22bab134e"},{url:"/animation/beef_animation_0089.jpg",revision:"0b4898fcfc8320483fc6d5b76b9f6be7"},{url:"/animation/beef_animation_0090.jpg",revision:"2d6fadcb117c3d26b3db705e7ab730fd"},{url:"/animation/beef_animation_0091.jpg",revision:"d860c154ec72ae8eaf2f3037cafccad9"},{url:"/animation/beef_animation_0092.jpg",revision:"c979057f350eefd4b5e1881ce5612fb2"},{url:"/animation/beef_animation_0093.jpg",revision:"581f0ab5ca7a90acba88e4c8cf4057e0"},{url:"/animation/beef_animation_0094.jpg",revision:"6d72c5aad610d097d0102bcec59e4960"},{url:"/animation/beef_animation_0095.jpg",revision:"68ec66b9bfa5fe8f8a7f27c3f8d4dc8c"},{url:"/animation/beef_animation_0096.jpg",revision:"c0b7cf57b59688e80f120b111cae585c"},{url:"/animation/beef_animation_0097.jpg",revision:"3f68c5840705d38cfd1c5a835a5109be"},{url:"/animation/beef_animation_0098.jpg",revision:"15912f6d530ca42203ccd21df958e454"},{url:"/animation/beef_animation_0099.jpg",revision:"fcee0529d8de18e4583640b15f406b07"},{url:"/animation/beef_animation_0100.jpg",revision:"db33e1ba389a7c19475646cc650a523e"},{url:"/animation/beef_animation_0101.jpg",revision:"a8df32c0573302d12f361101ee5acf51"},{url:"/animation/beef_animation_0102.jpg",revision:"cd4ef38daf8ebee373ebc0156f696098"},{url:"/animation/beef_animation_0103.jpg",revision:"884c02818ee64d11c613626305f04c37"},{url:"/animation/beef_animation_0104.jpg",revision:"194420a5e8e82a9a484781e28f1dd2a5"},{url:"/animation/beef_animation_0105.jpg",revision:"59849714334322af995342b524de7b57"},{url:"/animation/beef_animation_0106.jpg",revision:"b104f7263e3d759749a3a76b03072608"},{url:"/animation/beef_animation_0107.jpg",revision:"d89fa8d7f4a996822271e3d2f983503a"},{url:"/animation/beef_animation_0108.jpg",revision:"fd6a190e8f893c02098a5385d3b23ea1"},{url:"/animation/beef_animation_0109.jpg",revision:"1f40caf3da1e793e5bd3a611ad6097f7"},{url:"/animation/beef_animation_0110.jpg",revision:"e9949004842604784fbfed7d22ce8dba"},{url:"/animation/beef_animation_0111.jpg",revision:"c369b9733b84c96293ddc863d318a39f"},{url:"/animation/beef_animation_0112.jpg",revision:"93f5873984a69f4798cb334d7c36d0c4"},{url:"/animation/beef_animation_0113.jpg",revision:"3800c3ad653d444b094989a218ef30e4"},{url:"/animation/beef_animation_0114.jpg",revision:"c2e00aeb0d96bb2979544e92c69e29ea"},{url:"/animation/beef_animation_0115.jpg",revision:"fe798673634b10d07f345a759147779b"},{url:"/animation/beef_animation_0116.jpg",revision:"284b71c94e99682b0bb25a5fce054c30"},{url:"/animation/beef_animation_0117.jpg",revision:"c128f9816629c183aed14a3df69f9417"},{url:"/animation/beef_animation_0118.jpg",revision:"30515ff9a145baa53c5ec139672eb7ad"},{url:"/animation/beef_animation_0119.jpg",revision:"f77aaf293d710561efdb2cf5b59d7c92"},{url:"/animation/beef_animation_0120.jpg",revision:"808a91352e8bf64d64cc61b8c7c6354a"},{url:"/firebase-messaging-sw.js",revision:"6932a1b789300eb8e8fbfbb7d4e67ad9"},{url:"/fonts/digital-7 (mono).ttf",revision:"58045dabdc3a361cb9bb9faf2f1dd1f3"},{url:"/icons/angle-left-solid.svg",revision:"01cac396a65a4be9a16f27aaa686dd38"},{url:"/icons/circle-bars.svg",revision:"cde87e30dd82f010c39e44807a80be88"},{url:"/icons/circle-chevron-up-solid.svg",revision:"a556dc3db851dfc128a7030d1f423d09"},{url:"/icons/circle-envelope-regular.svg",revision:"fce4a154f0ea4f7c2cffd7b13f3d4dc6"},{url:"/icons/ellipsis-vertical-solid.svg",revision:"302f4aee004a9f89db4980fe4e84cce5"},{url:"/icons/github-brands.svg",revision:"ae2dc91925cdd94a05bc27bb13084dbc"},{url:"/icons/github-square-brands.svg",revision:"04d1b34ea8f82b7200bde5b9fdb42e65"},{url:"/icons/loading.svg",revision:"ecf18556f1f1bb4aef08fe5f1c4c34c8"},{url:"/icons/paper-plane-thin.svg",revision:"e58f547f78965e3f10ec0bce3ee30c1c"},{url:"/icons/pen-to-square-regular.svg",revision:"af1fbdb07ddd080136d5296ae7b554f2"},{url:"/icons/velog-square.svg",revision:"da584fb7a42d42b64c1c584af807873a"},{url:"/icons/velog.svg",revision:"7133b2ca7db87fa622cb032de2079cc5"},{url:"/icons/xmark-solid.svg",revision:"c00e63bbe2d3d1bdd774507192f18f21"},{url:"/images/flashlight.svg",revision:"7ce24a24b84e6fe889145e88d26da5e8"},{url:"/images/huggy_wuggy_finger.svg",revision:"e4eb1b38bb68015dc977d3a95a498b82"},{url:"/images/huggy_wuggy_left_finger.svg",revision:"25b9339e449e2b2caf59cecc2420c2d5"},{url:"/images/projects.gif",revision:"c26cc608d14bf243240d92f86b6c8807"},{url:"/json/loadingAnimation.json",revision:"2a7bcaa2c064077cbdca0dc28916887c"},{url:"/json/projectList.json",revision:"6755b197c96aa06051f780575233afdc"},{url:"/logos/apple-touch-icon-114x114.png",revision:"ab149278472f83cff572dc4a86763c26"},{url:"/logos/apple-touch-icon-120x120.png",revision:"8ed25c762ed5955132aa1f45158e1fcf"},{url:"/logos/apple-touch-icon-144x144.png",revision:"4bb884129b0881001827b6260a184acc"},{url:"/logos/apple-touch-icon-152x152.png",revision:"af66c45119655738c5e0cf2773193f1e"},{url:"/logos/apple-touch-icon-57x57.png",revision:"02b490937f2084306e920c62bb9399bf"},{url:"/logos/apple-touch-icon-60x60.png",revision:"1d249df29edb507a04a8e446f9a438b9"},{url:"/logos/apple-touch-icon-72x72.png",revision:"f2f89cf11859919ad97cbf1e687e5aa3"},{url:"/logos/apple-touch-icon-76x76.png",revision:"4eeb9bafe1ecadfc946560127aab9246"},{url:"/logos/beef.svg",revision:"36ae75caedbecf45dae8bcb131195f38"},{url:"/logos/browser-start-icon.png",revision:"069835bc21f20bc6fd93a97c03a77805"},{url:"/logos/clock-icon.png",revision:"56afb4b2fca9bd0ae63da2ca26a90b68"},{url:"/logos/diary-icon.png",revision:"4b710f69263c723c2b1d23c7b83973d9"},{url:"/logos/favicon-128.png",revision:"3828b1fb338e560e47c9db44b4d81ae9"},{url:"/logos/favicon-16x16.png",revision:"54e8a594ac90a9f526a647d2c4f0bbcd"},{url:"/logos/favicon-196x196.png",revision:"09adb50b6ba009fec0a23e702dd34f4e"},{url:"/logos/favicon-32x32.png",revision:"22356db81cc9c7dec7f92d8167076edb"},{url:"/logos/favicon-512x512.png",revision:"051960adf7212ebe57c00d2c66d90780"},{url:"/logos/favicon-96x96.png",revision:"421f32de7dbebe2b61f98f34a4a51571"},{url:"/logos/favicon.ico",revision:"b32a53ddc58697dc98e8f35e6a653166"},{url:"/logos/huggy_wuggy.svg",revision:"9e035260db3f860459b5f55f88890884"},{url:"/logos/logo1200x630.png",revision:"b801d2b58d8f07b169f19afa388a3397"},{url:"/logos/memory-test-icon.png",revision:"716683fcb5fc1bfc7b59cde13fda2640"},{url:"/logos/meta-beef-icon.png",revision:"8c88a7f1eb4852fd740635b5108c117e"},{url:"/logos/mstile-144x144.png",revision:"016968cd22444e0be99c91024c94a55e"},{url:"/logos/mstile-150x150.png",revision:"2a84ba5411844eaca4889d5fe51bc155"},{url:"/logos/mstile-310x150.png",revision:"fac4b442d89aa9c4f462f755cde46c3e"},{url:"/logos/mstile-310x310.png",revision:"a8141ba6d0463bc7e61a178af47cd9ed"},{url:"/logos/mstile-70x70.png",revision:"3828b1fb338e560e47c9db44b4d81ae9"},{url:"/logos/palette-vault-icon.png",revision:"d4c158862ae5df9204abfb47bac691a4"},{url:"/logos/place-review-icon.png",revision:"89f217bbe555905969840f75d5b0ab90"},{url:"/logos/raebef-icon.svg",revision:"ee42d6fc32399679c77d135e56f3470f"},{url:"/logos/shadow.svg",revision:"1b653a47081cbf94b60f90eca53b821d"},{url:"/logos/simple-memo-icon.png",revision:"5886e34ede584c9344abaa662a487fb6"},{url:"/logos/splatoon-icon.svg",revision:"c54dcd99205d0b634d38a71188d18683"},{url:"/manifest.json",revision:"f32ca0f3e106caa900ff184726c4457a"},{url:"/models/toDo.glb",revision:"370c4102476c012043e0ca9a38551eb6"},{url:"/models/weather.glb",revision:"b18f55669f6bd52d7a5bdbbb383e9197"},{url:"/robots.txt",revision:"a4d90f1a56c07a47ac74c53b6d58eb1b"},{url:"/screenshots/diary-calendar.png",revision:"d4cd84ba90368368f8f5519160084bb1"},{url:"/screenshots/diary-diary.png",revision:"d64bac3a9d404c41726569fe0a5c1b19"},{url:"/screenshots/diary-responsive.png",revision:"4f1179e99297611b43c8885e462bc9cc"},{url:"/screenshots/diary-tags.png",revision:"983a44b8819df9ffd6f14549751f7899"},{url:"/screenshots/diary-write.png",revision:"84cd654b07dc48aca63d8067df33914c"},{url:"/screenshots/interactive.png",revision:"4b2eae785969b2e84f3aa39c822065fb"},{url:"/screenshots/intro-project1.png",revision:"fba8437cf548f58ce26e8835563fc63f"},{url:"/screenshots/intro-project2.png",revision:"16200400cdfc06e70674cdc98c94f51e"},{url:"/screenshots/intro-project3.png",revision:"9c06184e7ffdd7c9efc58079790f2cbd"},{url:"/screenshots/intro-project4.png",revision:"d4473dd64435fd65a7f9dd90e254576b"},{url:"/screenshots/intro-project5.png",revision:"c962706ac5aa647cb189d7bcdea4acb2"},{url:"/screenshots/intro-project6.png",revision:"6170d28dfe57b3d6e52eee96967a72b0"},{url:"/screenshots/intro-project7.png",revision:"c505f5c00b2ab0391fceea3c772626c0"},{url:"/screenshots/intro-project8.png",revision:"09dc863c0bb9cfb43b02e1841df8d868"},{url:"/screenshots/intro-project9.png",revision:"478c15c25c8d284d937cda6f374ad51b"},{url:"/screenshots/meta-beef-login.png",revision:"b052ce6e4ad20e0f4cb9c9f7f259f154"},{url:"/screenshots/meta-beef-posts.png",revision:"8f8ae8b5e000ec8aef67540283f7e58f"},{url:"/screenshots/meta-beef.png",revision:"12d6a38d6f8312cb11020dbebc5e09e9"},{url:"/screenshots/palette-vault-empty.png",revision:"cf1ba0d72d0548941eb2683f4245c8ad"},{url:"/screenshots/palette-vault-new.png",revision:"2b250c0a03cdbd24b12f30e71669a6eb"},{url:"/screenshots/palette-vault-pwa.png",revision:"3dda24b87b1000301f609e0a88b7bd48"},{url:"/screenshots/palette-vault-pwa2.png",revision:"a6d70f52823aa7d9580e1cef9fb62179"},{url:"/screenshots/palette-vault.png",revision:"4149a5de6fda1343cb0b0b93296dd578"},{url:"/screenshots/place-review-login.png",revision:"dc7a7053509569f91dcb02619ae6d67c"},{url:"/screenshots/place-review-responsive.png",revision:"dad89eff43b9d94f8e404b25eb612219"},{url:"/screenshots/place-review-write.png",revision:"e969eb5c3973ec91f14a07e3f5d617d7"},{url:"/screenshots/place-review.png",revision:"1c21a5b11cd13933737a43ab84d9d00f"},{url:"/screenshots/raebef-cart.png",revision:"12c9d919d1c5fdaad9be498e2ac74464"},{url:"/screenshots/raebef-filter.png",revision:"6822058682402c4f1def485fb81314af"},{url:"/screenshots/raebef-login.png",revision:"167687d5eedcece2fbd98e88302986f6"},{url:"/screenshots/raebef-orders.png",revision:"9d6a920b46bded85360778ce7368eded"},{url:"/screenshots/raebef-products.png",revision:"126ec7740b51779eab08829f4d3d06a4"},{url:"/screenshots/raebef.png",revision:"8c0ef7c2fb605990c2f55743efa77e30"},{url:"/screenshots/react-native.png",revision:"4d15321182c857d3c4ede3e666f9d094"},{url:"/screenshots/simple-memo-memo.png",revision:"19c6ade5c54233f0b9ad8f82d67e65f3"},{url:"/screenshots/simple-memo-write.png",revision:"62b102f85e5d5f8da3e21ce22aa3edea"},{url:"/screenshots/simple-memo.png",revision:"d64c7f7a4ad97d4003a5c63b3421f2d0"},{url:"/screenshots/splatoon-slide.png",revision:"ac1a35cc6560ad0083aebbd5521bc137"},{url:"/screenshots/splatoon-twitter.png",revision:"ce3eed81e1d01305494f28c491fa89a7"},{url:"/screenshots/splatoon.png",revision:"85ef3383374a419f26541b557c1858bd"},{url:"/sitemap-0.xml",revision:"df168e96554db10e50f3e3a4e5a44171"},{url:"/sitemap.xml",revision:"03fb5d90b24a0d5b8bb208d384e3c1e4"},{url:"/skills/ai-brands.svg",revision:"79e343fcb61d14cc8869f6da9dc0c5ef"},{url:"/skills/blender-brands.svg",revision:"92167473a64fc77017f292c461d84217"},{url:"/skills/css3-alt-brands.svg",revision:"e6e91f02c767ccbc0c992e4cf4947a73"},{url:"/skills/firebase-brands.svg",revision:"8b47f7a90ace8aa01fe69b65815a5c38"},{url:"/skills/html5-brands.svg",revision:"66b63268b5b4cb3f917becc1dd626cb5"},{url:"/skills/js-brands.svg",revision:"5bcb18811940ab03bc110f12eeae9ce0"},{url:"/skills/netlify-brands.svg",revision:"5ac73a1e894c8a7435622c91612f8cfb"},{url:"/skills/next-brands.svg",revision:"a091549e24ae4612604f3623f859c426"},{url:"/skills/react-brands.svg",revision:"72495eb4feba2ab71689111497123a39"},{url:"/skills/react-native-brands.svg",revision:"955ee19c6522d6463a212b9c53fe4f6e"},{url:"/skills/react-query-brands.svg",revision:"7ffe054671b4bdee306ca26aa4c03003"},{url:"/skills/redux-brands.svg",revision:"a946fb5dfc397645eac05ca15e9bef70"},{url:"/skills/sass-brands.svg",revision:"3ddd6a4cf7100d26961ff4fbadcfa337"},{url:"/skills/tailwindcss-brands.svg",revision:"6bc99c75c7cc20c05d7dd42a4de3fedb"},{url:"/skills/three-brands.svg",revision:"125e086a8678ff5edeb65436f622c847"},{url:"/skills/ts-brands.svg",revision:"887621772e3c42cf71fdae54de7519e0"},{url:"/skills/vercel-brands.svg",revision:"8f1f22fcb55763302cbea887f9cb9c07"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:a,state:n})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
