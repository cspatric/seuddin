<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\TransactionCategory;
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
            'view-transaction-category',
            'create-transaction-category',
            'edit-transaction-category',
            'delete-transaction-category'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['slug' => $permission]);
        }

        $categories = [
            '13º Salário',
            'Adiantamento',
            'Água',
            'Ajuda de Custo',
            'Aluguel',
            'Aquisição de Equipamentos',
            'Brindes',
            'Combustível',
            'Comissão',
            'Compras de Mercadoria',
            'Confraternizações',
            'Contabilidade',
            'Contribuição a Sindicatos',
            'Correios, Fretes, Motoboy',
            'Cursos e Treinamentos',
            'Custos com Embalagens',
            'DARF Sócios',
            'DAS - Documento do simples nacional',
            'Despesas Bancárias',
            'Distribuição de Lucro',
            'Empréstimos',
            'Energia Elétrica',
            'Estornos',
            'Exame Admissional',
            'Férias',
            'FGTS',
            'ICMS ST sobre Vendas',
            'Impostos - ICMS',
            'Impostos do Imóvel',
            'Impostos-DAS',
            'INSS',
            'Inss Sócios',
            'Internet',
            'IRRF - Imposto de Renda Funcionários',
            'ISS',
            'Lavanderia',
            'Licença ou aluguel de softwares e programas',
            'Manutenção Equipamentos',
            'Máquinas utilizadas na prestação de serviços',
            'Marketing e Publicidade',
            'Materiais aplicados na prestação de serviços',
            'Materiais para revenda',
            'Material de Escritório',
            'Material de Limpeza e de Higiene',
            'Material Reforma',
            'Outra despesa',
            'Pagamento a Terceirizados',
            'Perdas, roubos, diferenças de caixa',
            'Permutas com terceiros',
            'Plano de Saúde',
            'Plano de Saúde Sócios',
            'Plano Odontológico',
            'Plano Odontológico Sócios',
            'Previdência dos Sócios',
            'Pró-labore',
            'Reformas e Materiais de reformas',
            'Rescisões Trabalhistas',
            'Salários de Funcionários',
            'Segurança, Vigilância',
            'Seuddin',
            'Telefonia e Internet',
            'Transportes, fretes, moto boy, uber',
            'Uniformes',
            'Uso/Consumo, Alimentação, Padaria, Mat.Limpeza',
            'Vale Alimentação',
            'Vale Transporte',
            'Viagens a trabalho',
        ];

        foreach ($categories as $category) {
            TransactionCategory::create(['name' => $category]);
        }
    }
}
