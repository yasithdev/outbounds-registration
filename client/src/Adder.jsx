import React, { Component } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import Keypress from "react-keypress";


// Adder component - represents the component that adds students to a list
class Adder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "students": [],
            dataSource: [
                {"ID":"120690G","Name":"WEERASINGHE P.A.K.S."},
                {"ID":"130001H","Name":"ABERATHNE A.H.K.T. "},
                {"ID":"130022X","Name":"ALWIS P.K.D.R.M. "},
                {"ID":"130037X","Name":"ARACHCHI R.L.M. "},
                {"ID":"130043L","Name":"ARUTHTHIRAN A. "},
                {"ID":"130045U","Name":"ASELA H.P. "},
                {"ID":"130047D","Name":"ATAPATTU D.R. "},
                {"ID":"130051J","Name":"BALASOORIYA B.A.C.D.K. "},
                {"ID":"130067M","Name":"BIBILE U.C. "},
                {"ID":"130071U","Name":"CHAMIKA L.Y.N. "},
                {"ID":"130074G","Name":"CHANDRALAL M.L.S.R.P. "},
                {"ID":"130078X ","Name":"CHANDRASOMA A.M.N.V."},
                {"ID":"130079C","Name":"CHANDRAWEERA L.P.D.S. "},
                {"ID":"130090C","Name":"DABARE H.D.N. "},
                {"ID":"130094R","Name":"DANGALLA D.A.D.J.S. "},
                {"ID":"130099L","Name":"DASSANAYAKE K.C. "},
                {"ID":"130101N","Name":"DAYARATHNA G.N.K. "},
                {"ID":"130102T","Name":"DAYARATHNA H.A.I.C. "},
                {"ID":"130109V","Name":"DE SILVA K.P.N.R. "},
                {"ID":"130113D","Name":"DE SILVA W.W.A. "},
                {"ID":"130121B","Name":"DEWAPPRIYA B.L.N. "},
                {"ID":"130139L","Name":"DULANI S.R. "},
                {"ID":"130140G","Name":"DULANJANI N.G.Y. "},
                {"ID":"130147J","Name":"EDIRIWEERA S.W. "},
                {"ID":"130148M","Name":"EDWARD U.A.D.K.N. "},
                {"ID":"130155G","Name":"FERNANDO A.S.R. "},
                {"ID":"130164H","Name":"GALAPPATHTHI H.A. "},
                {"ID":"130166P ","Name":"GAMAGE L.C.J."},
                {"ID":"130181G","Name":"GUNARATHNE M.H.S. "},
                {"ID":"130197K","Name":"HASANTHA N.R. "},
                {"ID":"130199T","Name":"HERATH A.N. "},
                {"ID":"130201V ","Name":"HERATH H.M.C.B."},
                {"ID":"130209D","Name":"HUSSAIN M.A.I. "},
                {"ID":"130217B ","Name":"INDUNIL P.K.N."},
                {"ID":"130224T","Name":"JANARTHANASARMA B. "},
                {"ID":"130227F","Name":"JAYALATH J.A.N. "},
                {"ID":"130237K","Name":"JAYASINGHE S.N. "},
                {"ID":"130244E ","Name":"JAYATISSA K.N.A."},
                {"ID":"130247P","Name":"JAYAWARDANA V.M. "},
                {"ID":"130251X","Name":"JAYAWARDHANA W.A.D.Y. "},
                {"ID":"130257V","Name":"JIHAN J.N. "},
                {"ID":"130258B","Name":"KAHAGALLA N. "},
                {"ID":"130268F","Name":"KANCHANA G.P. "},
                {"ID":"130269J","Name":"KANDEKUMBURA K.G.A.M. "},
                {"ID":"130274U","Name":"KARUNANAYAKE K.P.C.K. "},
                {"ID":"130277G","Name":"KARUNARATHNA G.B.W.D. "},
                {"ID":"130281M","Name":"KARUNARATHNE K.M.C.M. "},
                {"ID":"130306X","Name":"KUMARAGE K.T.S. "},
                {"ID":"130315A","Name":"KURUPPU K.A.H.C. "},
                {"ID":"130318K","Name":"LAHIRUNI R.A.M. "},
                {"ID":"130322R","Name":"LAKMAL E.M.S. "},
                {"ID":"130323V","Name":"LAKMAL K.J.T.D. "},
                {"ID":"130324B","Name":"LAKMAL L.D.C. "},
                {"ID":"130334F","Name":"LIYANAARACHCHI W.L.A.D.S.A. "},
                {"ID":"130366E","Name":"MALLAWAARACHCHI V.G. "},
                {"ID":"130372T ","Name":"MEEGAHAPOLA L.B. "},
                {"ID":"130375F","Name":"MENIKGAMA M.D.T. "},
                {"ID":"130380P","Name":"MUDALIGE H.Y. "},
                {"ID":"130383D","Name":"MUNASINGHE K.M.S.A. "},
                {"ID":"130385K","Name":"MUNASINGHE M.P.M. "},
                {"ID":"130398D","Name":"NILAN M.Y. "},
                {"ID":"130400F","Name":"NILWAKKA H.I. "},
                {"ID":"130401J","Name":"NIMALARATHNA L.B.E.H. "},
                {"ID":"130425K","Name":"PEIRIS P.N.Y. "},
                {"ID":"130430V","Name":"PERERA H.A.D.A. "},
                {"ID":"130482F","Name":"RAJAPAKSHE R.A.M.K. "},
                {"ID":"130487B ","Name":"RANAPATHI R.D.N."},
                {"ID":"130506K","Name":"RATHNAYAKA A.M.N.B. "},
                {"ID":"130507N","Name":"RATHNAYAKA B.M.C. "},
                {"ID":"130519D ","Name":"RUWANPATHIRANA A.K."},
                {"ID":"130525R","Name":"SAMARASINGHE S.S. "},
                {"ID":"130534T","Name":"SANDARUWAN M.W.D.P. "},
                {"ID":"130536C","Name":"SANDEEPA K.G.L. "},
                {"ID":"130546G","Name":"SAROAD W.M. "},
                {"ID":"130556L","Name":"SENARATH W.A.Y.P. "},
                {"ID":"130560T","Name":"SENTHALAN K. "},
                {"ID":"130578F","Name":"SUBASHITH S.K.T.D. "},
                {"ID":"130580E ","Name":"SUDASINGHA S.A.I.M."},
                {"ID":"130581H ","Name":"SUGATHADASA K.M."},
                {"ID":"130584U","Name":"TENNAGE P.N. "},
                {"ID":"130586D","Name":"TENNEKOON T.M.D.K.B. "},
                {"ID":"130590J ","Name":"THAVARAJAH M."},
                {"ID":"130594B","Name":"THILAKARATHNA B.J.C. "},
                {"ID":"130597L","Name":"THILAKARATHNE J.K.M.M. "},
                {"ID":"130601X","Name":"UDAYANATH H.H.H. "},
                {"ID":"130610A","Name":"UTHPALA H.U.K.G. "},
                {"ID":"130613K","Name":"VIDANAPATHIRANA J.C. "},
                {"ID":"130614N","Name":"VIDANAPATHIRANA M. "},
                {"ID":"130617C","Name":"VIMOSANAN A. "},
                {"ID":"130618F","Name":"VINUJAN S. "},
                {"ID":"130620E","Name":"VITHANAGE B.V. "},
                {"ID":"130625A","Name":"VITHUSHA AARABHI.A. "},
                {"ID":"130636H","Name":"WEERASEKARA W.M.M.R. "},
                {"ID":"130645J","Name":"WELLAPPILI D. "},
                {"ID":"130647R","Name":"WICKRAMARACHCHI W.A.A.S. "},
                {"ID":"130648V","Name":"WICKRAMARATHNA D.C.B. "},
                {"ID":"130650U","Name":"WICKRAMARATHNE M.S. "},
                {"ID":"130664P","Name":"WIJERATNA J.A.S. "},
                {"ID":"130676E","Name":"WIMALASIRI L.L.P.A. "},
                {"ID":"130683X","Name":"JAYAKODY J.A.L.P. "},
                {"ID":"130014B","Name":"ABILASHINI T. "},
                {"ID":"130029B","Name":"AMUTHEEZAN S. "},
                {"ID":"130044P ","Name":"ASANKA W.A.I."},
                {"ID":"130059P","Name":"BANDARA R.K. "},
                {"ID":"130085P","Name":"CHATHURANGA W.A.A. "},
                {"ID":"130130C","Name":"DILANKA D.N. "},
                {"ID":"130133M","Name":"DINUKA S.A.S. "},
                {"ID":"130149R ","Name":"EGODAGE D.N."},
                {"ID":"130154D","Name":"EPALIYANA K.V. "},
                {"ID":"130160R","Name":"FERNANDO W.H.L. "},
                {"ID":"130273P","Name":"KARUNANAYAKE K.H.R.Y.J. "},
                {"ID":"130311H","Name":"KUMARASINGHE T.D. "},
                {"ID":"130335J","Name":"LIYANAGE A.J.H. "},
                {"ID":"130376J","Name":"MIHIRANGA J.P.M. "},
                {"ID":"130377M ","Name":"MIHIRANGA W.S."},
                {"ID":"130395P","Name":"NAYANAJITH M.A.C.E. "},
                {"ID":"130437A","Name":"PERERA P.A.I.H. "},
                {"ID":"130472B","Name":"PRIYASAD M.K.D.D. "},
                {"ID":"130508T","Name":"RATHNAYAKA H.K.D.B.A. "},
                {"ID":"130517U","Name":"RODRIGO K.M.S. "},
                {"ID":"130554E","Name":"SELLAHEWA D.D. "},
                {"ID":"130561X","Name":"SEWWANDI K.A.U. "},
                {"ID":"130577C","Name":"SUBANGANI N. "},
                {"ID":"130637L","Name":"WEERASENA L.K.H.M. "},
                {"ID":"130468T","Name":"PRIYADARSHANI G.A.N "},
                {"ID":"150004","Name":"Abeyawardhana, P."},
                {"ID":"150017","Name":"Ahamed, M.R.S."},
                {"ID":"150018","Name":"Ahamed Nibraz, J."},
                {"ID":"150021","Name":"Ali, Y.A.M.M.A."},
                {"ID":"150026","Name":"Amrie, M.H.M."},
                {"ID":"150039","Name":"Anushan, S."},
                {"ID":"150041","Name":"Ariyarathne, H.B.G.C."},
                {"ID":"150042","Name":"Ariyawansha, W.K.Y.R."},
                {"ID":"150050","Name":"Atapattu, M.R."},
                {"ID":"150058","Name":"Bandara, H.M.L.S."},
                {"ID":"150066","Name":"Braveen, S."},
                {"ID":"150068","Name":"Buultjens, M.C."},
                {"ID":"150072","Name":"Chamara, T.V.T.S."},
                {"ID":"150073","Name":"Chamiran, A.G.K."},
                {"ID":"150082","Name":"Cheran, G.A."},
                {"ID":"150083","Name":"Christkiran, S."},
                {"ID":"150084","Name":"Chuhaashanan, N."},
                {"ID":"150097","Name":"Dayarathna, H.M.S.U."},
                {"ID":"150100","Name":"De Silva, D.M.N."},
                {"ID":"150104","Name":"De Silva, K.H.M."},
                {"ID":"150105","Name":"De Silva, K.T.N.G."},
                {"ID":"150106","Name":"De Silva, K.T.S."},
                {"ID":"150109","Name":"De Silva, W.K.A.K."},
                {"ID":"150110","Name":"De Silva, Y.I."},
                {"ID":"150111","Name":"De Zoysa, B.D.M."},
                {"ID":"150119","Name":"Dhananjaya, M.H.P."},
                {"ID":"150130","Name":"Dilshan, B.D."},
                {"ID":"150137","Name":"Dinushika, R.T."},
                {"ID":"150138","Name":"Dinushka, S.A.D."},
                {"ID":"150141","Name":"Disanayake, D.M.L.M."},
                {"ID":"150178","Name":"Gamage, G.S.W."},
                {"ID":"150182","Name":"Ganepola, G.A.K.Y."},
                {"ID":"150185","Name":"Geesara, K.P.K."},
                {"ID":"150186","Name":"Gihan, D.O.A."},
                {"ID":"150193","Name":"Gunathilaka, M.D.D.N."},
                {"ID":"150194","Name":"Gunathilaka, M.D.S.R."},
                {"ID":"150196","Name":"Gunavaran, B."},
                {"ID":"150199","Name":"Gunawardena, P.M.A."},
                {"ID":"150201","Name":"Gunawardhana, K.S.K.D.R"},
                {"ID":"150207","Name":"Haputhanthri, H.D.I."},
                {"ID":"150211","Name":"Hasoga, G.H.C.S."},
                {"ID":"150213","Name":"Heenatigala, H.B.W.S."},
                {"ID":"150230","Name":"Hewavitharana, D.N."},
                {"ID":"150234","Name":"Indrachapa, R.M.M."},
                {"ID":"150236","Name":"Inzamam, M.I."},
                {"ID":"150242","Name":"Jarsigan, V."},
                {"ID":"150243","Name":"Jathunarachchi, J.A.C.G."},
                {"ID":"150245","Name":"Jathusan, K."},
                {"ID":"150251","Name":"Jayasanka, K.M.C."},
                {"ID":"150256","Name":"Jayasena, R.A.S.K."},
                {"ID":"150264","Name":"Jayathilaka, D.T.P."},
                {"ID":"150280","Name":"Jeewanthi, H.M.D."},
                {"ID":"150284","Name":"Kahawala, S.M."},
                {"ID":"150288","Name":"Abivarshi, K."},
                {"ID":"150290","Name":"Kannangara, D.M.R."},
                {"ID":"150291","Name":"Kirshika, K."},
                {"ID":"150292","Name":"Karandana, K.L.C.L."},
                {"ID":"150297","Name":"Karunanayaka, K.M.A.A."},
                {"ID":"150298","Name":"Karunanayake, K.O.M."},
                {"ID":"150301","Name":"Karunarathna, I.M.A.S."},
                {"ID":"150303","Name":"Karunarathna, S.K.S.H."},
                {"ID":"150319","Name":"Kavmini, A.K.L."},
                {"ID":"150320","Name":"Keerthana, U."},
                {"ID":"150322","Name":"Ketharan, S."},
                {"ID":"150324","Name":"Kiroshkumar, R."},
                {"ID":"150328","Name":"Kooragoda, A.M."},
                {"ID":"150330","Name":"Kularajini, C."},
                {"ID":"150341","Name":"Kumara, T.M.R."},
                {"ID":"150345","Name":"Kumarasinghe, K.M.K."},
                {"ID":"150359","Name":"Lenadora, D.S."},
                {"ID":"150371","Name":"Madhuranga, E.P.K.D."},
                {"ID":"150377","Name":"Madhushanki, A.S."},
                {"ID":"150379","Name":"Madumalee, W.A.S."},
                {"ID":"150381","Name":"Maduranga, M.D.I."},
                {"ID":"150387","Name":"Madushan, A.V.A.R."},
                {"ID":"150400","Name":"Manjitha, H.M.A.S."},
                {"ID":"150406","Name":"Mendis, H.K.V.P."},
                {"ID":"150418","Name":"Piruntha, N."},
                {"ID":"150419","Name":"Neththasinghe, N.A.S.L."},
                {"ID":"150438","Name":"Pathirana, P.T.U."},
                {"ID":"150464","Name":"Piumika, D.G.S."},
                {"ID":"150482","Name":"Priyadarshani, H/.S."},
                {"ID":"150486","Name":"Puwakdandawa, D.P."},
                {"ID":"150487","Name":"Radershan, S."},
                {"ID":"150490","Name":"Rajapakse, R.P.L.D."},
                {"ID":"150493","Name":"Rajapaksha, M.D.W."},
                {"ID":"150497","Name":"Rajenthar, J."},
                {"ID":"150506","Name":"Ranasinghe, M.M.S.P."},
                {"ID":"150510","Name":"Ranathunge, R.R."},
                {"ID":"150511","Name":"Ranatunge, R.A.D.S.P."},
                {"ID":"150512","Name":"Ranawaka, E.S.V."},
                {"ID":"150528","Name":"Rathnayake, K.G.R.D."},
                {"ID":"150529","Name":"Rathnayake, P.K."},
                {"ID":"150532","Name":"Rathnayake, W.R.A.N.M."},
                {"ID":"150533","Name":"Ratnayake, R.M.K.V."},
                {"ID":"150535","Name":"Rukshan, S.A.P.A."},
                {"ID":"150536","Name":"Rupasinghe, H.C.J."},
                {"ID":"150547","Name":"Samaranayake, K.V.I.H."},
                {"ID":"150549","Name":"Samarasekara, Y.J."},
                {"ID":"150551","Name":"Samarasinghe, O.G."},
                {"ID":"150557","Name":"Samarawickrama, P.C.N."},
                {"ID":"150562","Name":"Sangeerththan, B."},
                {"ID":"150564","Name":"Sarangan, J."},
                {"ID":"150566","Name":"Sarathchandra, U.L.M.L."},
                {"ID":"150567","Name":"Sathiyakugan, B."},
                {"ID":"150568","Name":"Sathiyan, R."},
                {"ID":"150574","Name":"Senarath, D.A.D.P."},
                {"ID":"150578","Name":"Senarathne, P.A.J.I."},
                {"ID":"150584","Name":"Senthaalan, T."},
                {"ID":"150589","Name":"Sewwandi, N.A.Y.R."},
                {"ID":"150591","Name":"Shehan, S.P.D.L."},
                {"ID":"150596","Name":"Silva, K.T.S."},
                {"ID":"150600","Name":"Siriwardhana, P.H.C."},
                {"ID":"150601","Name":"Siriwardhana, R.I.P.B.B."},
                {"ID":"150613","Name":"Sudarshana, M.A.K.H."},
                {"ID":"150616","Name":"Sudusinghe, P.S."},
                {"ID":"150621","Name":"Suranga, E.S.M."},
                {"ID":"150630","Name":"Tharsanan, K."},
                {"ID":"150641","Name":"Thumilan, M."},
                {"ID":"150648","Name":"Vahesan, V."},
                {"ID":"150656","Name":"Vithanage, L.S."},
                {"ID":"150657","Name":"Vitharama, A.V.R.S."},
                {"ID":"150662","Name":"Wanniachchi, W.K.R.S."},
                {"ID":"150663","Name":"Wanniarachchi, L.O."},
                {"ID":"150667","Name":"Wathukara, W.T.G."},
                {"ID":"150698","Name":"Wijesena, H.A.C.K."},
                {"ID":"150716","Name":"Yogendran, N."},
                {"ID":"150724","Name":"Saif, A.C"},
                {"ID":"160001K","Name":"AATHMAN T."},
                {"ID":"160007J","Name":"ABINAYAN B."},
                {"ID":"160010L","Name":"ADHIKARI A.M.N.C.R."},
                {"ID":"160012U","Name":"AHKAM M.N.M."},
                {"ID":"160013A","Name":"AJANTHASINGAM J."},
                {"ID":"160016K","Name":"AKALANKA K.P.B.S."},
                {"ID":"160032F","Name":"ANURANJANA S.H.M.U."},
                {"ID":"160034M","Name":"ANUSHIYA T."},
                {"ID":"160040D","Name":"ARCHULAN R."},
                {"ID":"160046C","Name":"ATHUKORALA A.U.S."},
                {"ID":"160047F","Name":"ATHUKORALA H.I."},
                {"ID":"160067P","Name":"BIMSARA V.G.B."},
                {"ID":"160069A","Name":"BOGAHAWATHTHA T.H."},
                {"ID":"160071X","Name":"BOYAGANE W.M.I.B."},
                {"ID":"160075M","Name":"BUDDHIMA K.P.K."},
                {"ID":"160078B","Name":"CHAMISHKA P.H.S."},
                {"ID":"160083K","Name":"CHATHURA B.D."},
                {"ID":"160097G","Name":"DE ALMEIDA P.M.N."},
                {"ID":"160109A","Name":"DEHIGASPITIYA S.L."},
                {"ID":"160110T","Name":"DEMOTTE P.A."},
                {"ID":"160127C","Name":"DISANAYAKA I.M.M."},
                {"ID":"160129J","Name":"DISSANAYAKA D.M.C.H."},
                {"ID":"160137G","Name":"DISSANAYAKE W.M.B.M."},
                {"ID":"160153C","Name":"FERNANDO N.I.L."},
                {"ID":"160156M","Name":"FONSEKA W.A.T.R."},
                {"ID":"160170B","Name":"GUNARATHNE K.M.B.G.B."},
                {"ID":"160172H","Name":"GUNARATNE L.W.U."},
                {"ID":"160176A","Name":"GUNASEKARA M.G.S.K."},
                {"ID":"160180F","Name":"GUNASINGHE K.K."},
                {"ID":"160182M","Name":"GUNATHILAKE B.L.L.G."},
                {"ID":"160186E","Name":"GUNAWARDENA R.S."},
                {"ID":"160187H","Name":"GUNAWARDHANA H.G.M.A.K."},
                {"ID":"160197M","Name":"HEMACHANDRA B.L.O.D."},
                {"ID":"160211E","Name":"HETTIWATTA T.L."},
                {"ID":"160214P","Name":"HEWAGAMA M."},
                {"ID":"160217D","Name":"HINGURUDUWA L.O."},
                {"ID":"160222M","Name":"ISANKA S.R"},
                {"ID":"160224V","Name":"ISURANGA M.T.U."},
                {"ID":"160233X","Name":"JAYASEKARA J.A.R.P."},
                {"ID":"160238R","Name":"JAYASINGHE J.M.H.A."},
                {"ID":"160245K","Name":"JAYATILAKA A.W.T."},
                {"ID":"160248X","Name":"JAYAWEERA B.K.D.I.M."},
                {"ID":"160253H","Name":"JAYAWICKRAMA T.D."},
                {"ID":"160254L","Name":"JEEWANTHA A.V.C."},
                {"ID":"160255P","Name":"JENARTHANAN R."},
                {"ID":"160256U","Name":"JEYAKEETHAN J."},
                {"ID":"160259G","Name":"KAHANDAWAARACHCHI C.N."},
                {"ID":"160267E","Name":"KANARUPAN N."},
                {"ID":"160278M","Name":"KARUNANAYAKE K.B.M."},
                {"ID":"160280L","Name":"KARUNARATHNA D.V.D.R."},
                {"ID":"160287N","Name":"KARUNASENA T.G.U.S."},
                {"ID":"160289X","Name":"KARUNATHILAKA V.G.M.I."},
                {"ID":"160292B","Name":"KATULANDA O.A."},
                {"ID":"160299D","Name":"KAYATHIRI M."},
                {"ID":"160314X","Name":"KULASINGHE R.D.T.D."},
                {"ID":"160317J","Name":"KULATUNGE M.C.N.U."},
                {"ID":"160325G","Name":"KUMARAMOORTHY S."},
                {"ID":"160339D","Name":"LAKSHIKKA S"},
                {"ID":"160340X","Name":"LAKSHITHA B.L.N."},
                {"ID":"160342F","Name":"LANGAPPULI D.B."},
                {"ID":"160344M","Name":"LAVANARAJ S."},
                {"ID":"160355X","Name":"LIYANAGE S.M."},
                {"ID":"160356C","Name":"LIYANAPATHIRANA U.L."},
                {"ID":"160358J","Name":"LOGHI P."},
                {"ID":"160361L","Name":"MADHAVI G.H.I."},
                {"ID":"160374E","Name":"MADURANGA H.P.U."},
                {"ID":"160376L","Name":"MADURAWE R.N."},
                {"ID":"160377P","Name":"MADUSANKA B.A.T."},
                {"ID":"160385M","Name":"MADUSHAN W.M.D."},
                {"ID":"160386R","Name":"MADUSHANKA H.P.M."},
                {"ID":"160387V","Name":"MADUSHANKA N.G.S."},
                {"ID":"160393K","Name":"MAMALGAHA I.G.L.B."},
                {"ID":"160400H","Name":"MATHIVATHANAN K."},
                {"ID":"160408N","Name":"MUAAZ M.F.M."},
                {"ID":"160411R","Name":"MUNASINGHE A.D.U.C."},
                {"ID":"160424J","Name":"NARANPANAWA W.M.R.D.K."},
                {"ID":"160425M","Name":"NARTHTHANAN T."},
                {"ID":"160427V","Name":"NAVODYA N.P.P.N."},
                {"ID":"160432G","Name":"NAYANAJITH M.M.D.S."},
                {"ID":"160441H","Name":"NIRMAL M.G.P."},
                {"ID":"160442L","Name":"NIROJAN T."},
                {"ID":"160449N","Name":"NURADHA M.H.R."},
                {"ID":"160451M","Name":"PADMASIRI R.M.H.N."},
                {"ID":"160452R","Name":"PANAPITIYA P.D.D.S."},
                {"ID":"160471A","Name":"PERERA K.R.N."},
                {"ID":"160473G","Name":"PERERA L.R.S."},
                {"ID":"160474K","Name":"PERERA M.R.S."},
                {"ID":"160477X","Name":"PERERA M.V.R."},
                {"ID":"160485U","Name":"PINTO H.P.A.I.C."},
                {"ID":"160489K","Name":"PIUMINI M.G.M."},
                {"ID":"160491J","Name":"PIYARATHNA L.L.C."},
                {"ID":"160506M","Name":"RAJAPAKSHA K.T.B."},
                {"ID":"160509B","Name":"RAJAPAKSHA R.B.M."},
                {"ID":"160514K","Name":"RAJITHA M.D.C."},
                {"ID":"160517X","Name":"RANASINGHE M.K.M.M."},
                {"ID":"160537H","Name":"RUCHINI M.M.C."},
                {"ID":"160538L","Name":"SABESAN S."},
                {"ID":"160544C","Name":"SAJEEVAN V."},
                {"ID":"160548R","Name":"SAMARAWICKRAMA P.C.P."},
                {"ID":"160555K","Name":"SANDARUWAN T.H.J."},
                {"ID":"160557T","Name":"SANDEEPA G.L.C.A."},
                {"ID":"160561B","Name":"SANKALPA B.M.G.H."},
                {"ID":"160571F","Name":"SENANAYAKE S."},
                {"ID":"160575V","Name":"SENARATHNA S.M.S.D."},
                {"ID":"160576B","Name":"SENEVIRATHNE D.B."},
                {"ID":"160578H","Name":"SENEVIRATHNE W.D.L.I."},
                {"ID":"160585C","Name":"SHASHIRANGANA A.A.J."},
                {"ID":"160596K","Name":"SIVARAM R."},
                {"ID":"160605P","Name":"SRIYOUKAN S."},
                {"ID":"160611F","Name":"SULHI A.C.M."},
                {"ID":"160618H","Name":"THAMEL W.G.S.H."},
                {"ID":"160628M","Name":"THENNAKOON T.M.C.P."},
                {"ID":"160632U","Name":"THILANKA K.H.I."},
                {"ID":"160633A","Name":"THINESHAN P."},
                {"ID":"160642B","Name":"UDUWANAGE J.T."},
                {"ID":"160646P","Name":"UTHAYAKUMAR S."},
                {"ID":"160658E","Name":"VIVEKVINUSHANTH C."},
                {"ID":"160670H","Name":"WEERASINGHA W.K.P.K."},
                {"ID":"160671L","Name":"WEERASINGHE A.M."},
                {"ID":"160676G","Name":"WEERASINGHE J.S.D."},
                {"ID":"160677K","Name":"WEERASINGHE M.H.T.N."},
                {"ID":"160684E","Name":"WELMILLA T.S."},
                {"ID":"160686L","Name":"WICKRAMAGE W.S.S."},
                {"ID":"160696R","Name":"WIJEGUNARATHNA K.I."},
                {"ID":"160711L","Name":"WIJESIRI R.I.M."},
                {"ID":"160713U","Name":"WIJETHUNGA R.M.K.D."},
                {"ID":"160719T","Name":"WISHWAJITH L.H.T.K."},
                {"ID":"160723B","Name":"ZAID M.J.U."}],
            "studentList": {},
            current_id: null,
            selectedFood: "NON_VEG"
        };

    }


    handleAdd(event){

        let re = RegExp("[0-9]{6}[A-Z]");

        if (!re.test(event.target.value)){
            return;
        }

        let studentId = event.target.value;

        if (this.state.studentList.hasOwnProperty(studentId)){
            this.refs.nameInput.value = this.state.studentList[studentId].trim();;

        }

        this.setState({
            current_id: studentId
        });

        this.refs.nameInput.focus();
        this.refs.nameInput.select();

    }

    reset() {
        this.props.onStudentsChanged([]);
        this.setState({"students": []});
    }

    handleRemove(event){
        let studentName = event.target.getAttribute('data-name').trim();
        let students = this.state.students.filter(x => x.name.trim() !== studentName);
        this.props.onStudentsChanged(students);
        this.setState({"students": students});
    }


    handleNewNameEntry(event){

        if (event.target.value.length > 0){

            let studentId = this.state.current_id;

            let alreadyExisting = this.state.students.filter(x => x.id === studentId).length;

            if (alreadyExisting){
                alert("Already entered that student ID!");
                return;
            }

            let studentName = event.target.value.trim();

            let students = this.state.students;
            students.push({
                "id": studentId,
                "name": studentName,
                "food": this.state.selectedFood
            });
            this.props.onStudentsChanged(students);
            this.setState({
                "students": students,
            });


            this.refs.nameInput.value = "";
            this.refs.idInput.value = "";
            this.refs.idInput.focus();

        }

    }

    handleFoodChange(event){
        this.setState({
            selectedFood: event.target.value
        })
    }

    componentDidMount(){
        let tmp = {};

        this.state.dataSource.forEach((student) => {
            tmp[student["ID"]] = student["Name"].trim();
        });

        this.setState({
            "studentList": tmp
        })
    }

    onCtrlEnter(){
        console.log("Ctrl enter");
        // this.props.onSubmit();
    }



    render() {

        return (
            <div>
                <form>
                    <div className="form-row">
                        <div className="col-4">
                            <input
                                type="text"
                                className="form-control"
                                id="idInput"
                                ref="idInput"
                                placeholder="Index No."
                                style={{"textTransform": "capitalize"}}
                                onChange={this.handleAdd.bind(this)}
                                required />


                        </div>
                        <div className="col-4">
                            <input
                                type="text"
                                className="form-control"
                                id="nameInput"
                                ref="nameInput"
                                placeholder="Name"
                                style={{"textTransform": "capitalize"}}
                                onChange={this.handleNewNameEntry.bind(this)}
                                onKeyPress={this.onCtrlEnter}
                                required/>
                        </div>
                        <div className="col-4">
                            <label>
                                <input type="radio" name="food" value="VEG"
                                       checked={this.state.selectedFood === "VEG"}
                                       onChange={this.handleFoodChange.bind(this)}

                                />
                                Veg
                            </label>
                            <br/>
                            <label>
                                <input type="radio" name="food" value="NON_VEG"
                                       label="Non-veg" checked={this.state.selectedFood === "NON_VEG"}
                                       onChange={this.handleFoodChange.bind(this)}/>
                                Non-veg
                            </label>
                        </div>
                    </div>
                </form>
                <br/>
                <form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <div className="input-group mb-3">
                            <ul id="studentList" className="list-group">
                                {this.state.students.map((student) => (
                                        <li key={student.name} className="list-group-item d-flex justify-content-between">
                                            {student.name}
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <button data-name={student.name} type="button" className="btn btn-danger badge badge-danger" onClick={this.handleRemove.bind(this)}>x</button>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <button type="submit" className={"btn btn-primary " + (this.props.submitEnabled ? "" : "disabled")} disabled={!this.props.submitEnabled}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Adder;