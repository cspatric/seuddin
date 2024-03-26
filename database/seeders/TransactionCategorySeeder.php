<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\TransactionCategory;
use App\Models\TransactionCategoryGroup;
use App\Models\TransactionCategorySubgroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionCategorySeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view-transaction-category-group',
            'create-transaction-category-group',
            'edit-transaction-category-group',
            'delete-transaction-category-group',
            'view-transaction-category-subgroup',
            'create-transaction-category-subgroup',
            'edit-transaction-category-subgroup',
            'delete-transaction-category-subgroup',
            'view-transaction-category',
            'create-transaction-category',
            'edit-transaction-category',
            'delete-transaction-category'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        $groups = [
            'Recebimentos' => [
                'Recebimentos Operacionais' => [
                    ['name' => 'Vendas', 'type' => 'in'],
                ]
            ],
            'Pagamentos' => [
                'Aquisição de clientes' => [
                    ['name' => 'Marketing', 'type' => 'out'],
                ],
                'Mercadorias/Serviços' => [
                    ['name' => 'Compras', 'type' => 'out'],
                    ['name' => 'Receitas Financeiras', 'type' => 'in'],
                ],
                'Impostos' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                    ['name' => 'IRPJ Retido sobre a Receita', 'type' => 'out'],
                    ['name' => 'CSLL Retido sobre a Receita', 'type' => 'out'],
                    ['name' => 'INSS Retido sobre a Receita', 'type' => 'out'],
                    ['name' => 'PIS Retido sobre a Receita', 'type' => 'out'],
                    ['name' => 'COFINS Retido sobre a Receita', 'type' => 'out'],
                    ['name' => 'Outras Retenções sobre a Receita', 'type' => 'out']
                ],
                'Funcionários' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
                'Fixas' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
                'Variáveis' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
                'Financeiras' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
                'Investimentos' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
                'Endomarketing' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
                'Doações' => [
                    ['name' => 'ISS Retido sobre a Receita', 'type' => 'out'],
                ],
            ],
            'Resultado da Operação da Loja' => [
                'Outros recebimentos (+)' => [
                    ['name' => 'Outros', 'type' => 'in']
                ],
                'Outros pagamentos (-)' => [
                    ['name' => 'Outros', 'type' => 'out']
                ],
                'Gastos com sócios' => [
                    ['name' => 'Outros', 'type' => 'out']
                ]
            ],
            'Resultado final do mês' => [
                ['name' => 'Reserva de 13o', 'type' => 'out'],
                ['name' => 'Reserva de Sonho', 'type' => 'out'],
            ],
        ];

        foreach ($groups as $groupName => $subgroups) {
            $group = TransactionCategoryGroup::create(['name' => $groupName]);

            foreach ($subgroups as $subgroupName => $transactionCategories) {
                if (array_key_exists('name', $transactionCategories)) {
                    TransactionCategory::create([
                        'transaction_category_group_id' => $group->id,
                        'transaction_category_subgroup_id' => null,
                        'name' => $transactionCategories['name'],
                        'type' => $transactionCategories['type']
                    ]);
                } else {
                    $subgroup = TransactionCategorySubgroup::create([
                        'transaction_category_group_id' => $group->id,
                        'name' => $subgroupName
                    ]);

                    foreach ($transactionCategories as $transactionCategory) {
                        TransactionCategory::create([
                            'transaction_category_group_id' => $group->id,
                            'transaction_category_subgroup_id' => $subgroup->id,
                            'name' => $transactionCategory['name'],
                            'type' => $transactionCategory['type']
                        ]);
                    }
                }
            }
        }

//        $categories = [
//            '13º Salário',
//            'Adiantamento',
//            'Água',
//            'Ajuda de Custo',
//            'Aluguel',
//            'Aquisição de Equipamentos',
//            'Brindes',
//            'Combustível',
//            'Comissão',
//            'Compras de Mercadoria',
//            'Confraternizações',
//            'Contabilidade',
//            'Contribuição a Sindicatos',
//            'Correios, Fretes, Motoboy',
//            'Cursos e Treinamentos',
//            'Custos com Embalagens',
//            'DARF Sócios',
//            'DAS - Documento do simples nacional',
//            'Despesas Bancárias',
//            'Distribuição de Lucro',
//            'Empréstimos',
//            'Energia Elétrica',
//            'Estornos',
//            'Exame Admissional',
//            'Férias',
//            'FGTS',
//            'ICMS ST sobre Vendas',
//            'Impostos - ICMS',
//            'Impostos do Imóvel',
//            'Impostos-DAS',
//            'INSS',
//            'Inss Sócios',
//            'Internet',
//            'IRRF - Imposto de Renda Funcionários',
//            'ISS',
//            'Lavanderia',
//            'Licença ou aluguel de softwares e programas',
//            'Manutenção Equipamentos',
//            'Máquinas utilizadas na prestação de serviços',
//            'Marketing e Publicidade',
//            'Materiais aplicados na prestação de serviços',
//            'Materiais para revenda',
//            'Material de Escritório',
//            'Material de Limpeza e de Higiene',
//            'Material Reforma',
//            'Outra despesa',
//            'Pagamento a Terceirizados',
//            'Perdas, roubos, diferenças de caixa',
//            'Permutas com terceiros',
//            'Plano de Saúde',
//            'Plano de Saúde Sócios',
//            'Plano Odontológico',
//            'Plano Odontológico Sócios',
//            'Previdência dos Sócios',
//            'Pró-labore',
//            'Reformas e Materiais de reformas',
//            'Rescisões Trabalhistas',
//            'Salários de Funcionários',
//            'Segurança, Vigilância',
//            'Seuddin',
//            'Telefonia e Internet',
//            'Transportes, fretes, moto boy, uber',
//            'Uniformes',
//            'Uso/Consumo, Alimentação, Padaria, Mat.Limpeza',
//            'Vale Alimentação',
//            'Vale Transporte',
//            'Viagens a trabalho',
//        ];
//
//        foreach ($categories as $category) {
//            TransactionCategory::create(['name' => $category]);
//        }
    }
}
