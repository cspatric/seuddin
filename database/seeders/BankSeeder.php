<?php

namespace Database\Seeders;

use App\Models\Bank;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class BankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view-bank',
            'create-bank',
            'edit-bank',
            'delete-bank'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        $banks = [
            ['compe_code' => '001', 'name' => 'Banco do Brasil S.A.'],
            ['compe_code' => '003', 'name' => 'Banco da Amazônia S.A'],
            ['compe_code' => '004', 'name' => 'Banco do Nordeste do Brasil S.A.'],
            ['compe_code' => '010', 'name' => 'Credicoamo Crédito Rural Cooperativa'],
            ['compe_code' => '017', 'name' => 'BNY Mellon Banco S.A.'],
            ['compe_code' => '019', 'name' => 'Banco Azteca do Brasil S.A'],
            ['compe_code' => '021', 'name' => 'Banestes S.A. Banco do Estado do Espírito Santo'],
            ['compe_code' => '025', 'name' => 'Banco Alfa S.A.'],
            ['compe_code' => '033', 'name' => 'Banco Santander (Brasil) S.A.'],
            ['compe_code' => '036', 'name' => 'Banco Bradesco BBI S.A.'],
            ['compe_code' => '037', 'name' => 'Banco do Estado do Pará S.A.'],
            ['compe_code' => '040', 'name' => 'Banco Cargill S.A.'],
            ['compe_code' => '041', 'name' => 'Banco do Estado do Rio Grande do Sul S.A.'],
            ['compe_code' => '047', 'name' => 'Banco do Estado de Sergipe S.A.'],
            ['compe_code' => '062', 'name' => 'Hipercard Banco Múltiplo S.A.'],
            ['compe_code' => '063', 'name' => 'Banco Bradescard S.A.'],
            ['compe_code' => '065', 'name' => 'Banco Bracce S/A'],
            ['compe_code' => '066', 'name' => 'Banco Morgan Stanley S.A.'],
            ['compe_code' => '069', 'name' => 'BPN Brasil Banco Múltiplo S.A.'],
            ['compe_code' => '070', 'name' => 'Banco de Brasília S.A.'],
            ['compe_code' => '074', 'name' => 'Banco J Safra S.A.'],
            ['compe_code' => '075', 'name' => 'Banco ABN AMRO S.A.'],
            ['compe_code' => '076', 'name' => 'Banco KDB do Brasil S.A.'],
            ['compe_code' => '077', 'name' => 'Banco Intermedium S.A.'],
            ['compe_code' => '078', 'name' => 'BES Investimento do Brasil S.A. - Banco de Investimento'],
            ['compe_code' => '079', 'name' => 'Banco Original do Agronegócio S.A.'],
            ['compe_code' => '081', 'name' => 'BBN Banco Brasileiro de Negócios S.A.'],
            ['compe_code' => '082', 'name' => 'Banco Topázio S. A.'],
            ['compe_code' => '083', 'name' => 'Banco da China Brasil S.A.'],
            ['compe_code' => '084', 'name' => 'Uniprime Norte do Paraná - Coop. de Economia e Crédito Mútuo dos Médicos'],
            ['compe_code' => '085', 'name' => 'Cooperativa Central de Cred Urbano - Cecred'],
            ['compe_code' => '087', 'name' => 'Cooperativa Central de Economia e Crédito Mútuo das Unicreds do Estado de Santa Catarina Ltda'],
            ['compe_code' => '088', 'name' => 'Banco Randon S.A'],
            ['compe_code' => '089', 'name' => 'Cooperativa de Crédito Rural da Região da Mogiana'],
            ['compe_code' => '090', 'name' => 'Cooperativa Central de Crédito do Estado de SP Ltda - Unicred Central SP'],
            ['compe_code' => '091', 'name' => 'Central de Cooperativas de Economia e Crédito Mútuo do Estado do Rio Grande do Sul - Unicred'],
            ['compe_code' => '092', 'name' => 'Brickell S.A. Crédito, Financiamento e Investimento'],
            ['compe_code' => '094', 'name' => 'Banco Petra S.A'],
            ['compe_code' => '096', 'name' => 'Banco BM&F Bovespa de Serviços de Liquidação e Custódia S.A'],
            ['compe_code' => '097', 'name' => 'Cooperativa Central de Credito Noroeste Brasileiro Ltda - Centralcredi'],
            ['compe_code' => '098', 'name' => 'Credialiança Cooperativa de Crédito Rural'],
            ['compe_code' => '099', 'name' => 'Uniprime Central - Central Interestadual de Cooperativas de Crédito Ltda'],
            ['compe_code' => '102', 'name' => 'Xp Investimentos S.A'],
            ['compe_code' => '104', 'name' => 'Caixa Econômica Federal'],
            ['compe_code' => '107', 'name' => 'Banco BBM S.A'],
            ['compe_code' => '112', 'name' => 'Central das Cooperativas de Crédito do Brasil Central'],
            ['compe_code' => '114', 'name' => 'Central das Cooperativas de Economia e Crédito Mútuo do Estado do Espírito Santo'],
            ['compe_code' => '119', 'name' => 'Banco Western Union do Brasil S.A'],
            ['compe_code' => '120', 'name' => 'Banco RodoBens S.A'],
            ['compe_code' => '121', 'name' => 'Banco Gerador S.A'],
            ['compe_code' => '122', 'name' => 'Banco Bradesco BERJ S/A'],
            ['compe_code' => '124', 'name' => 'Banco Woori Bank do Brasil S.A'],
            ['compe_code' => '125', 'name' => 'Brasil Plural S.A. Banco Múltiplo'],
            ['compe_code' => '132', 'name' => 'ICBC do Brasil Banco Múltiplo S.A.'],
            ['compe_code' => '184', 'name' => 'Banco Itaú BBA S.A'],
            ['compe_code' => '204', 'name' => 'Banco Bradesco Cartões S.A.'],
            ['compe_code' => '208', 'name' => 'Banco BTG Pactual S.A'],
            ['compe_code' => '212', 'name' => 'Banco Original S.A'],
            ['compe_code' => '213', 'name' => 'Banco Arbi S.A'],
            ['compe_code' => '214', 'name' => 'Banco Dibens S.A'],
            ['compe_code' => '217', 'name' => 'Banco John Deere S.A.'],
            ['compe_code' => '218', 'name' => 'Banco BS2 S.A.'],
            ['compe_code' => '222', 'name' => 'Banco Credit Agricole Brasil S.A'],
            ['compe_code' => '224', 'name' => 'Banco Fibra S.A'],
            ['compe_code' => '233', 'name' => 'Banco Cifra S.A'],
            ['compe_code' => '237', 'name' => 'Banco Bradesco S.A'],
            ['compe_code' => '241', 'name' => 'Banco Clássico S.A'],
            ['compe_code' => '243', 'name' => 'Banco Máxima S.A'],
            ['compe_code' => '246', 'name' => 'Banco ABC Brasil S.A'],
            ['compe_code' => '248', 'name' => 'Banco Boa Vista Interatlântico S.A'],
            ['compe_code' => '249', 'name' => 'Banco Investcred Unibanco S.A.'],
            ['compe_code' => '250', 'name' => 'BCV - Banco de Crédito e Varejo S.A.'],
            ['compe_code' => '254', 'name' => 'Paraná Banco S.A'],
            ['compe_code' => '260', 'name' => 'Nu Pagamentos S.A'],
            ['compe_code' => '263', 'name' => 'Banco Cacique S.A'],
            ['compe_code' => '265', 'name' => 'Banco Fator S.A'],
            ['compe_code' => '266', 'name' => 'Banco Cédula S.A'],
            ['compe_code' => '280', 'name' => 'will bank'],
            ['compe_code' => '290', 'name' => 'PagBank'],
            ['compe_code' => '300', 'name' => 'Banco de La Nacion Argentina'],
            ['compe_code' => '318', 'name' => 'Banco BMG S.A'],
            ['compe_code' => '320', 'name' => 'Banco Industrial e Comercial S.A'],
            ['compe_code' => '323', 'name' => 'Mercado Pago'],
            ['compe_code' => '335', 'name' => 'Banco Digio S.A.'],
            ['compe_code' => '336', 'name' => 'Banco C6 S.A.'],
            ['compe_code' => '340', 'name' => 'Super Pagamentos S.A.'],
            ['compe_code' => '341', 'name' => 'Banco Itaú'],
            ['compe_code' => '366', 'name' => 'Banco Société Générale Brasil S.A.'],
            ['compe_code' => '370', 'name' => 'Banco Mizuho do Brasil S.A.'],
            ['compe_code' => '376', 'name' => 'Banco J. P. Morgan S.A.'],
            ['compe_code' => '380', 'name' => 'PicPay'],
            ['compe_code' => '389', 'name' => 'Banco Mercantil do Brasil S.A.'],
            ['compe_code' => '394', 'name' => 'Banco Bradesco Financiamentos S.A.'],
            ['compe_code' => '399', 'name' => 'HSBC Bank Brasil S.A. - Banco Múltiplo'],
            ['compe_code' => '403', 'name' => 'CORA Sociedade de Crédito Direto S.A.'],
            ['compe_code' => '412', 'name' => 'Banco Capital S.A.'],
            ['compe_code' => '422', 'name' => 'Banco Safra S.A.'],
            ['compe_code' => '456', 'name' => 'Banco de Tokyo-Mitsubishi UFJ Brasil S.A.'],
            ['compe_code' => '461', 'name' => 'Asaas'],
            ['compe_code' => '464', 'name' => 'Banco Sumitomo Mitsui Brasileiro S.A.'],
            ['compe_code' => '473', 'name' => 'Banco Caixa Geral - Brasil S.A.'],
            ['compe_code' => '477', 'name' => 'Citibank N.A.'],
            ['compe_code' => '487', 'name' => 'Deutsche Bank S.A - Banco Alemão'],
            ['compe_code' => '492', 'name' => 'ING Bank N.V.'],
            ['compe_code' => '494', 'name' => 'Banco de la Republica Oriental del Uruguay'],
            ['compe_code' => '495', 'name' => 'Banco de la Provincia de Buenos Aires'],
            ['compe_code' => '505', 'name' => 'Banco Credit Suisse (Brasil) S.A.'],
            ['compe_code' => '600', 'name' => 'Banco Luso Brasileiro S.A.'],
            ['compe_code' => '604', 'name' => 'Banco Industrial do Brasil S.A.'],
            ['compe_code' => '610', 'name' => 'Banco VR S.A.'],
            ['compe_code' => '611', 'name' => 'Banco Paulista S.A.'],
            ['compe_code' => '612', 'name' => 'Banco Guanabara S.A.'],
            ['compe_code' => '613', 'name' => 'Banco Pecúnia S.A.'],
            ['compe_code' => '623', 'name' => 'Banco Panamericano S.A.'],
            ['compe_code' => '626', 'name' => 'Banco Ficsa S.A.'],
            ['compe_code' => '630', 'name' => 'Banco Intercap S.A.'],
            ['compe_code' => '633', 'name' => 'Banco Rendimento S.A.'],
            ['compe_code' => '634', 'name' => 'Banco Triângulo S.A.'],
            ['compe_code' => '637', 'name' => 'Banco Sofisa S.A.'],
            ['compe_code' => '643', 'name' => 'Banco Pine S.A.'],
            ['compe_code' => '652', 'name' => 'Itaú Unibanco Holding S.A.'],
            ['compe_code' => '653', 'name' => 'Banco Indusval S.A.'],
            ['compe_code' => '654', 'name' => 'Banco A.J. Renner S.A.'],
            ['compe_code' => '655', 'name' => 'Banco Votorantim S.A.'],
            ['compe_code' => '707', 'name' => 'Banco Daycoval S.A.'],
            ['compe_code' => '719', 'name' => 'BANIF - Banco Internacional do Funchal (Brasil) S.A'],
            ['compe_code' => '735', 'name' => 'Banco Pottencial S.A.'],
            ['compe_code' => '739', 'name' => 'Banco BGN S.A.'],
            ['compe_code' => '740', 'name' => 'Banco Barclays S.A.'],
            ['compe_code' => '741', 'name' => 'Banco Ribeirão Preto S.A.'],
            ['compe_code' => '743', 'name' => 'Banco Semear S.A.'],
            ['compe_code' => '745', 'name' => 'Banco Citibank S.A.'],
            ['compe_code' => '746', 'name' => 'Banco Modal S.A.'],
            ['compe_code' => '747', 'name' => 'Banco Rabobank International Brasil S.A.'],
            ['compe_code' => '748', 'name' => 'Banco Cooperativo Sicredi S.A.'],
            ['compe_code' => '751', 'name' => 'Scotiabank Brasil S.A. Banco Múltiplo'],
            ['compe_code' => '752', 'name' => 'Banco BNP Paribas Brasil S.A.'],
            ['compe_code' => '753', 'name' => 'NBC Bank Brasil S.A - Banco Múltiplo'],
            ['compe_code' => '755', 'name' => 'Banco of America Merril Lynch Banco Múltiplo S.A.'],
            ['compe_code' => '756', 'name' => 'Banco Cooperativo do Brasil S.A - Bancoob'],
            ['compe_code' => '757', 'name' => 'Banco KEB do Brasil S.A.'],
        ];

        foreach ($banks as $bank) {
            Bank::create($bank);
        }
    }
}
