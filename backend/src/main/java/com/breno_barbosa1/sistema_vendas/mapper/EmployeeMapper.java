package com.breno_barbosa1.sistema_vendas.mapper;

import com.breno_barbosa1.sistema_vendas.dto.EmployeeDTO;
import com.breno_barbosa1.sistema_vendas.entity.Employee;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    Employee employeeDTOToEmployee(EmployeeDTO employeeDTO);
    EmployeeDTO employeeToEmployeeDTO(Employee employee);
}
